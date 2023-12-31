const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstname: { type: String,required: true, trim: true, maxLength: 10, minLength: 3 },

  lastname: { type: String,required: true, trim: true, maxLength: 10, minLength: 3 },

  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },

  role: { type: String, required: true, enum: ['HR', 'normal employee'] },
  
  password: { type: String }
});

employeeModel = mongoose.model('Employee', employeeSchema);

module.exports = employeeModel;