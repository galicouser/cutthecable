const mongoose = require("mongoose");
const SubscriptionPackage = require('./subscriptionPackage');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,

  },
  lastName: {
    type: String,

  },
  profile_picture: {
    type: String,
    required: true,
  },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  subscription: {
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPackage'
    },
    purchaseDate: Date,
    endDate: Date
  },
  creation_date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
