const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderDate:{
    type: Date,
    required: true,
    default: Date.now(),
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status:{
    type: String,
    required: true,
    default: 'Processing',
  },
  appID:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = mongoose.model('Order',OrderSchema);