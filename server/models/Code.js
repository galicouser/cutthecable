const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  duration: {
    type: Number,
    required: true
  },
  activated: {
    type: Boolean,
    required: true,
    default: false
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

const Code = mongoose.model('Code', codeSchema);

module.exports = Code;