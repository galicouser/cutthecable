const express = require('express');
const path = require('path');
const axios = require('axios');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const username = process.env.DB_USER_NAME;
const password = process.env.DB_USER_PASS;
const db_endpoint = process.env.DB_ENDPOINT;
const auth = require("./routes/auth");
const checkoutRouter = require("./routes/checkout");
const subscriptionPackage = require("./routes/subscriptionPackage");
const codeRouter = require("./routes/code");
const { findCode } = require('./controller/codeController');
const { updateCode,updateUserSub, createPurchase, capturePaypalOrder } = require('./controller/checkout');

const { sendSubscriptionCodes } = require('./utils/emailService');

const uri = `mongodb+srv://${username}:${password}@${db_endpoint}/`;
// const uri = `mongodb+srv://${username}:${password}@cutthecable-prod.r3qdzla.mongodb.net/?retryWrites=true&w=majority&appName=CutTheCable-Prod`
const paths = [
  '/',
  '/UserProfile',
  '/Fqs',
  '/AdminPortal',
  '/SuccessfulPayment',
  '/FailedPayment'
];

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

const filePath = path.join(__dirname, '../public/index.html'); // Example file path

paths.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
});



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/checkout", checkoutRouter);
app.use('/subscriptionPackages', subscriptionPackage);
app.use('/codes', codeRouter);

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB with auth service is running");
    const db = mongoose.connection.db;

    // Import and run the scheduled task
    require('./controller/UserExpiration')(db);
  })
  .catch((error) => console.log("Error while connecting to atlas", error));

  app.get('/payment-confirmation', async (req, res) => {
    const { pg, subscription, user, email, con, duration, price, token, payerID } = req.query;
  
    try {
      switch (pg) {
        case 'paypal':
          try {
            // Capture the PayPal order
            const captureResponse = await capturePaypalOrder(token);
            if (captureResponse.statusCode === 200) {
              console.log('Payment captured successfully:', captureResponse.result);
      
              // Perform actions after successful payment capture
              createPurchase(user, duration, con, price, payerID);
              updateUserSub(user, subscription, duration);
              const codes = await findCode(duration, con);
      
              if (codes.length <= 0) {
                // TODO: Notify user and admin about missing codes
                sendSubscriptionCodes(null, email);
                return res.sendFile(path.join(__dirname, 'confirmationPage.html'));
              } else {
                // Update codes and send them to the user
                for (const codeId of codes.map(code => code._id)) {
                  await updateCode(codeId, user);
                }
      
                await sendSubscriptionCodes(codes, email, duration);
      
                return res.sendFile(path.join(__dirname, 'confirmationPage.html'));
              }
            } else {
              console.error('Error capturing PayPal order:', captureResponse.statusText);
              return res.sendFile(path.join(__dirname, 'orderFailed.html'));
            }
          } catch (error) {
            console.error('Error capturing PayPal order:', error);
            // Handle error
            return res.sendFile(path.join(__dirname, 'orderFailed.html'));
          }
          break;
  
        case 'stripe':
          try {
              createPurchase(user, duration, con, price, payerID);
              updateUserSub(user, subscription, duration);
              const codes = await findCode(duration, con);
       
              if (codes.length <= 0) {
                // TODO: Notify user and admin about missing codes
                sendSubscriptionCodes(null, email);
                return res.sendFile(path.join(__dirname, 'confirmationPage.html'));
              } else {
                // Update codes and send them to the user
                for (const codeId of codes.map(code => code._id)) {
                  await updateCode(codeId, user);
                }
                await sendSubscriptionCodes(codes, email, duration);
      
                return res.sendFile(path.join(__dirname, 'confirmationPage.html'));
              }
          } catch (error) {
            console.error('Error capturing stripe order:', error);
            // Handle error
            return res.sendFile(path.join(__dirname, 'orderFailed.html'));
          }
          break;
  
        default:
          console.error('Unsupported payment gateway:', pg);
          return res.status(400).send('Unsupported payment gateway');
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
      return res.sendFile(path.join(__dirname, 'orderFailed.html'));
    }
  });

module.exports = app;