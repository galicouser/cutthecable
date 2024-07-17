const mongoose = require('mongoose');
const User = require('./user.js');
const SubscriptionPackage = require('./subscriptionPackage.js');

const purchaseHistorySchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  itemPrice: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  itemID: {
    type: String,
    required: false,
  },
  validity: {
    type: String,
    required: false,
  },
  checkoutID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'fail'],
    required: true,
  },
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;
