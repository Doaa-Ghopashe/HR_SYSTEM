const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isHR: {
    type: Boolean,
    default: 'false'
  },
  token: {
    type: String
  },

});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;