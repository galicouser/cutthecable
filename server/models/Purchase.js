const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  connections: {
    type: Number,
    required: true
  },
  total_cost: {
    type: Number,
    required: true
  },
  purchase_date: {
    type: Date,
    required: true
  }
});
const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;