const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  },
  password: {
    type: String,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    required:true
  },
  token: {
    type: String
  }

});


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
