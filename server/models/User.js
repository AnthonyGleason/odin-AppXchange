const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  wishlist:{
    type: [mongoose.Schema.Types.ObjectId], //points to apps created with the app model
    default: [],
  },
  purchases:{
    type: [mongoose.Schema.Types.ObjectId], //points to orders created with the order model
    default: [],
  },
  firstName:{
    type: String,
    min: 1,
    required
  },
  lastName:{
    type: String,
    min: 1,
    required,
  },
  ccn:{
    type: Number,
    min: 16,
    max: 19,
  },
  address:{
    type: String,
    min: 5,
  },
  addressLineTwo:{
    type: String,
  },
  state:{
    type: String,
  },
  city:{
    type: String,
  },
  phoneNumber:{
    type: Number,
    min:10,
    max:11,
  },
  dateCreated:{
    type: Date,
    required,
  },
  frozen:{
    type:Boolean,
    default: false,
  }
})

module.exports = mongoose.model('User',UserSchema);