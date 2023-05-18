const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  wishlist:{
    type: [mongoose.Schema.Types.ObjectId], //points to app document ids created with the app model
    default: [],
  },
  firstName:{
    type: String,
    min: 1,
    required: true,
  },
  lastName:{
    type: String,
    min: 1,
    required: true,
  },
  email:{
    type: String,
    required: true,
    validator: function(value) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value);
    },
  },
  password:{
    type: String,
    required: true,
  },
  dateCreated:{
    type: Date,
    required: true,
    default: Date.now(),
  },
  frozen:{
    type:Boolean,
    default: false,
  }
})

module.exports = mongoose.model('User',UserSchema);