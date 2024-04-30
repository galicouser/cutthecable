const express = require('express');
const path = require('path');
const axios = require('axios');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();
const username = process.env.DB_USER_NAME;
const password = process.env.DB_USER_PASS;
const auth = require("./routes/auth");
const checkoutRouter = require("./routes/checkout");
const subscriptionPackage = require("./routes/subscriptionPackage");
const codeRouter = require("./routes/code");
const { updateCode, findCode } = require('./controller/codeController')
const { updateUserSub } = require('./controller/checkout');

const { sendSubscriptionCodes } = require('./utils/emailService');

const uri = `mongodb+srv://${username}:${password}@nocablesneeded.ffgwwlu.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", auth);
app.use("/checkout", checkoutRouter);
app.use('/subscriptionPackages', subscriptionPackage);
app.use('/codes', codeRouter);

mongoose
  .connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("Monogo with auth service is running"))
  .catch((error) => console.log("Error while connecting to atlas", error));

app.get('/payment-confirmation', async (req, res) => {
  const { subscription, user, email, con, duration }  = req.query;

  updateUserSub(user, subscription, duration);

  const codes = await findCode(duration, con);

  if (codes.length <= 0) {
    /**TODO:let user and admin know about missing codes*/
    sendSubscriptionCodes(null);
    console.log('whoops');
  } else {

    for (const codeId of codes.map(code => code._id)) {
      await updateCode(codeId, user);
    }

    let alertUser = codes.length < con;
    await sendSubscriptionCodes(codes, email, duration);
  }

  /**TODO: figure out how to replace confirmation page with the already built react component */
  res.sendFile(path.join(__dirname, 'confirmationPage.html'));
});

module.exports = app;