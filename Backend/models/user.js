const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: 'string',required: true
    },
    lastName:{type: 'string'},
    age:{type: 'number'},
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: { type: Boolean, default:'false'},
    token: { type: String },
    
  });

  const userModel=mongoose.model('user',userSchema);
  module.exports = userModel;