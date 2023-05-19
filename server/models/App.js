const mongoose = require('mongoose');

const AppSchema = new mongoose.Schema({
  name:{
    type: String,
    min: 1,
    required: true,
  },
  desc:{
    type: String,
    min: 10,
    required: true,
  },
  publisher:{
    type: String,
    min: 1,
    default: 'Unknown',
    required: true,
  },
  salesCount:{
    type: Number,
    default: 0,
    required: true,
  },
  category:{
    type: String,
    required: true,
    default: 'General',
  },
  price:{
    type: Number,
    required: true,
    default: 1,
  },
  hidden:{
    type: Boolean,
    required: true,
    default: false,
  }
})

module.exports = mongoose.model('App',AppSchema);