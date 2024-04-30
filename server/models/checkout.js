const mongoose = require('mongoose');
const User = require('./user.js');
const SubscriptionPackage = require('./subscriptionPackage.js');

const purchaseHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_id: {
    type: String,
    required: true
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPackage',
    required: true
  },
  total_cost: {
    type: Number,
    required: true
  },
  payment_status: {
    type: String,
    enum: ['authorized', 'captured', 'refunded'],
    required: true,
  }
});

const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema);

module.exports = PurchaseHistory;
