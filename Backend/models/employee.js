const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, unique: true, required: true },
  firstName: { type: String, trim: true, maxLength: 10, minLength: 3 },
  lastName: { type: String, trim: true, maxLength: 10, minLength: 3 },
  email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
  role: { type: String, required: true, enum: ['HR', 'Normal employee'] },
  password: { type: String, required: true, match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ }
});

const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;