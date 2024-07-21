const mongoose = require('mongoose');
require("dotenv").config();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const path = require('path');

// const paypal = require('paypal-rest-sdk');

// paypal.configure({
//   mode: process.env.PMODE, //sandbox or live
//   client_id: process.env.PCLIENT_KEY,
//   client_secret: process.env.PCLIENT_SECRET
// });

const User = require("../models/user");
const Checkout  = require("../models/checkout");
const Code = require("../models/Code");
const Purchase = require("../models/Purchase");
const SubscriptionPackage  = require("../models/subscriptionPackage");
const RedeemCode = require('../models/redeem');

// // Comment out the validation imports if you want to remove validation temporarily
// const {
//     validateFields
//   } = require("../middleware/checkout");

const { sendEmails } = require("../utils/emailService");


const paypal = require('@paypal/checkout-server-sdk');
const nodemailer = require('nodemailer');

// const client = new paypal.core.PayPalHttpClient({
//   clientId: process.env.PP_CLIENT_KEY,
//   clientSecret: process.env.PP_CLIENT_SECRET,
//   environment: paypal.core.SandboxEnvironment
// });

const createPaypalOrder = async (req, res) => {
  const { price, duration, connections, email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return;
  }

  const userId = user._id.toString();

  try {
    // Fetch subscription package synchronously
    const subscriptionPackage = await fetchSubscriptionPackage(duration, connections);

    const subscriptionId = subscriptionPackage._id;
    let paypalClient;
    console.log(process.env.PMODE);
    if (process.env.PMODE === 'live') {
        paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.LiveEnvironment(
        process.env.PCLIENT_KEY,
        process.env.PCLIENT_SECRET
      ));
    } else {
        paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
        process.env.PCLIENT_KEY,
        process.env.PCLIENT_SECRET
      ));
    }
    console.log(paypalClient);


    // Create order using PayPal API
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: price, // Example price, replace with actual price
        }
      }],
      application_context: {
        return_url: `${process.env.FRONTEND_URL}payment-confirmation?pg=paypal&subscription=${subscriptionId.toString()}&user=${userId}&email=${email}&con=${connections}&duration=${duration}&price=${price}`, // Replace with your actual return URL
        cancel_url: `${process.env.FRONTEND_URL}`, // Replace with your actual cancel URL
      }
    });

    const order = await paypalClient.execute(request);

    // Check if the order was successfully created
    if (order.statusCode === 201) {
      const approveLink = order.result.links.find(link => link.rel === 'approve');

      if (approveLink) {
        return res.status(200).json({ redirectUrl: approveLink.href });
      } else {
        console.error('Approval link not found in PayPal response');
        return res.status(500).send('Error: Approval link not found');
      }
    } else {
      console.error('Error creating PayPal order:', order);
      return res.status(500).send('Error creating PayPal order');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).send(error);
  }
};

const capturePaypalOrder = async (token) => {
  try {

    let paypalClient;
    console.log(process.env.PMODE);
    if (process.env.PMODE === 'live') {
        paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.LiveEnvironment(
        process.env.PCLIENT_KEY,
        process.env.PCLIENT_SECRET
      ));
    } else {
        paypalClient = new paypal.core.PayPalHttpClient(new paypal.core.SandboxEnvironment(
        process.env.PCLIENT_KEY,
        process.env.PCLIENT_SECRET
      ));
    }
    console.log(paypalClient);

    const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
    captureRequest.requestBody({});

    const captureResponse = await paypalClient.execute(captureRequest);

    if (captureResponse.statusCode === 201 || captureResponse.statusCode === 200) {
      return { result: captureResponse.result, statusCode: 200 };
    } else {
      console.error('Error capturing PayPal order - Status:', captureResponse.statusCode);
      console.error('Error capturing PayPal order - Response:', captureResponse.result);
      return { error: 'Capture failed with status ' + captureResponse.statusCode };
    }
  } catch (error) {
    console.error('Error capturing order:', error);
    return { error: error.message || 'Unknown error occurred' };
  }
};



const fetchSubscriptionPackage = async (duration, connections) => {
  try {
    // Construct the query based on the provided duration and connections
    const query = {
      duration: duration,
      connections: connections
    };

    // Find subscription package that matches the provided duration and connections
    const subscriptionPackage = await SubscriptionPackage.findOne(query);

    return subscriptionPackage;
  } catch (error) {
    console.error('Error fetching subscription package:', error);
    throw error;
  }
};

const findCode = async (duration, connections) => {
  const code = await Code.find({ duration, activated: false, assignee: null }).limit(connections);

  if (!code) {
    console.error('No available code found');
    return;
  }

  return code;
}

const updateCode = async (id, userId) => {
  try {
    // Find codes associated with the subscription ID
    const code = await Code.findById(id);

    if (!code) {
      console.error('No available code found');
      return;
    }

    code.activated = true
    code.assignee = userId;
    await code.save();

    return code;
  } catch (error) {
    console.error('Error updating codes:', error);
    throw error;
  }
};

const createStripeOrder = async (req, res) => {
  try {
    const { price, duration, connections, email, customer_name, customer_phone, customer_email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let userId = user._id;
    let customerId;

    const subscriptionPackage = await fetchSubscriptionPackage(duration, connections);

    const subscriptionId = subscriptionPackage._id;

    // Check if customer already exists in Stripe
    const get_customer = await stripe.customers.search({
      query: `email:'${email}'`,
    });

    if (get_customer.data && get_customer.data.length > 0) {
      customerId = get_customer.data[0].id;
    } else {
      // Create new customer in Stripe
      const customer = await stripe.customers.create({
        name: customer_name,
        phone: customer_phone,
        email: customer_email,
      });
      customerId = customer.id;
    }

    
    
    //Prepare line items for the Checkout Session
    const line_items = [{

        price_data: {
          currency: 'usd',
          product_data: {
            name: `Cut The Cable digital subscription for ${duration} Month(s)`,
            description: 'Subscription code(s) for Cut The Cable'
          },
          unit_amount: price * 100, // Stripe expects the amount in cents
        },
        quantity: 1
      }];

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: false,
      },
      line_items,
      mode: "payment",
      customer: customerId,
      success_url: `${process.env.CLIENT_URL}payment-confirmation?pg=stripe&session_id={CHECKOUT_SESSION_ID}&subscription=${subscriptionId.toString()}&user=${userId}&email=${email}&con=${connections}&duration=${duration}&price=${price}`,
      cancel_url: `${process.env.CLIENT_URL}/UserProfile`,
    });
    res.send(session.url);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
}

const success = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  // const capturepayment = await stripe.paymentIntents.capture(session.payment_intent);
  // console.log(session);
  const session_items = await stripe.checkout.sessions.listLineItems(req.query.session_id);
  // console.log(session_items.data[0].description);
  // Split the output into lines
  const lines = session_items.data[0].description.split('\n');

  // Extract the "Validity" number and "Plan ID" from the lines
  let validity = null;
  let planId = null;

  // lines.forEach(line => {
  //   if (line.startsWith('Validity:')) {
  //     // Extract the "Validity" number (assuming it's always a number followed by " months")
  //     validity = parseInt(line.match(/\d+/)[0]);
  //   } else if (line.startsWith('Plan ID:')) {
  //     // Extract the "Plan ID" (assuming it's the value after "Plan ID:")
  //     planId = line.split('Plan ID: ')[1];
  //   }
  // });


  // console.log(session);
  const email = session.customer_details.email;
  const admin_email = process.env.ADMIN_EMAIL;

  const checkouthistory = new Checkout({
    userID: email,
    checkoutID: req.query.session_id,
    itemPrice: session.amount_total,
    itemID: planId,
    validity: validity,
    status: 'success'
  });
  await checkouthistory.save();
    const newSubscription = new Subscription({
      user: email,
      subscription_code: redeemcode.code
    });
    try {
      redeemcode.status = 'Availed';
      redeemcode.purchase_date = new Date();
      const savedSubscription = await newSubscription.save();
      const updateredeem = await redeemcode.save();
      const subject = 'NCN subscription'
      const message = 'Thank you for purchasing! To redeem your subscription, please log into portal, goto subscription section and click on redeem subscription button';
      // await sendEmails(email,admin_email,message,subject);

      console.log("Thank you for purchasing! To redeem your subscription, please log into portal, goto subscription section and click on redeem subscription button");
      // return res.status(200).send({ message: "Subscription purchased" });
      res.redirect(`${process.env.FRONTEND_URL}/SuccessfulPayment`);


    } catch (err) {
      const subject = 'NCN subscription'
      const message = 'Something went wrong during subscription purchase we are looking into it';
      // await sendEmails(email,admin_email,message,subject);

      console.log("something went wrong",err);
      // res.redirect(`${process.env.FRONTEND_URL}FailedPayment`);
      // return res.status(400).send({ message: "something went wrong" });
    }

    // try {
    //   const savedRedeemCode = await newRedeemCode.save();
    //   console.log("Code saved");
    //   return res.status(200).send({ message: "Code saved!" });
    // } catch (err) {
    //   console.log("Code not saved", err);
    //   return res.status(400).send({ message: "Code not saved" });
    // }
    // res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
  };

const success_paypal = async (req, res) => {

  let paymentId = req.query.paymentId;
  let payerId = {'payer_id': req.query.PayerID};
  paypal.payment.execute(paymentId, payerId, async function (error, payment) {
    if (error) {
        console.error(error.response);
    } else {
        if (payment.state == 'approved') {
          const lines = payment.transactions[0].item_list.items[0].name.split('\n')
          let validity = null;
          let planId = null;
          lines.forEach(line => {
            if (line.startsWith('Validity:')) {
              // Extract the "Validity" number (assuming it's always a number followed by " months")
              validity = parseInt(line.match(/\d+/)[0]);
            } else if (line.startsWith('Plan ID:')) {
              // Extract the "Plan ID" (assuming it's the value after "Plan ID:")
              planId = line.split('Plan ID: ')[1];
            }
          });

          // console.log(payment.transactions[0].amount.total);
          // return;
          const email = payment.payer.payer_info.email;
          const admin_email = process.env.ADMIN_EMAIL;
          const redeemcode = await RedeemCode.findOne({
            status: 'Pending',
            itemID: planId,
            validity: validity,
          });

          // console.log(redeemcode);

            const checkouthistory = new Checkout({
              userID: email,
              checkoutID: req.query.paymentId,
              itemPrice: payment.transactions[0].amount.total,
              itemID: planId,
              validity: validity,
              status: 'success'
            });
            await checkouthistory.save();
            if (redeemcode) {
              const newSubscription = new Subscription({
                user: email,
                subscription_code: redeemcode.code
              });
              try {
                redeemcode.status = 'Availed';
                redeemcode.purchase_date = new Date();
                const savedSubscription = await newSubscription.save();
                const updateredeem = await redeemcode.save();
                const subject = 'NCN subscription'
                const message = 'Thank you for purchasing! To redeem your subscription, please log into portal, goto subscription section and click on redeem subscription button';
                await sendEmails(email,admin_email,message,subject);

                console.log("Thank you for purchasing! To redeem your subscription, please log into portal, goto subscription section and click on redeem subscription button");
                // return res.status(200).send({ message: "Subscription purchased" });
                res.redirect(`${process.env.FRONTEND_URL}/SuccessfulPayment`);


              } catch (err) {
                const subject = 'NCN subscription'
                const message = 'Something went wrong during subscription purchase we are looking into it';
                await sendEmails(email,admin_email,message,subject);

                console.log("something went wrong",err);
                res.redirect(`${process.env.FRONTEND_URL}/FailedPayment`);
                // return res.status(400).send({ message: "something went wrong" });
              }
            }
        } else {
          const subject = 'NCN subscription'
          const message = 'Subscription purchased but no redeemable code availale please contact admin';
          await sendEmails(email,admin_email,message,subject);
          res.redirect(`${process.env.FRONTEND_URL}/FailedPayment`);
          // return res.status(404).send({ message: "Subscription purchased but no redeemable code availale please contact admin" });
        }
    }
});
};

const failure = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
};

const updateUserSub = async (userId, subId, duration) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found');
    }

    /**TODO: Edge case of a user trying to subscribe twice */
    if (JSON.stringify(user.subscription) !== '{}') return;

    const newSubscription = {
      package: subId,
      purchaseDate: new Date()
    };

    user.subscription = newSubscription;
    await user.save();

  } catch (error) {
    console.error('Updating user subscription:', error);
  }
};

const createPurchase = async (user, duration, connections, price, payerID) => {
  try {
    const newPurchase = new Purchase({
      user_id: user,
      duration,
      connections,
      total_cost: price,
      purchase_date: new Date()
    });

    const savedPurchase = await newPurchase.save();

    return savedPurchase;
  } catch (error) {
    console.error('Error creating purchase:', error);
    throw error;
  }
};

module.exports = {
  createPaypalOrder,
  createStripeOrder,
  updateCode,
  findCode,
  capturePaypalOrder,
  updateUserSub,
  createPurchase,
  success
}


/** TODO
 * Update paypal return URL
 * clear console logs
 * modify failure/success methods
 */