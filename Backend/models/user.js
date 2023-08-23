const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }

});


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
