const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
  id:{type: mongoose.Schema.Types.ObjectId,unique:true,required:true},
  firstName:{
      type: String
  },
  lastName:{type:String},
  email: {
    type: String,
    required: true,
    unique: true
  },
  role:{type: String,required: true},
  password:{type:String,required:true}
});

const employeeModel = mongoose.model('employee', employeeSchema);
module.exports = employeeModel;