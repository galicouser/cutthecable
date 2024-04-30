const mongoose = require('mongoose');

const subscriptionPackage = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  connections: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
  pricePerMonth: {
    type: String,
    default: null
  }
});

const SubscriptionPackage = mongoose.model('SubscriptionPackage', subscriptionPackage);

module.exports = SubscriptionPackage;