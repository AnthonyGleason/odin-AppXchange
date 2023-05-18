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
  }
});

module.exports = mongoose.model('Order',OrderSchema);