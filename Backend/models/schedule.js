const mongoose = require('mongoose'),

scheduleSchema = new mongoose.Schema({
    employee_id:{type: mongoose.Schema.Types.ObjectId, required:true , ref:"employee",unique:false },
    status:{type:String},
    shift_start_time:{type:Date, required:true},
    shift_start_time:{type:Date, required:true},
    actual_start_time:{type:Date},
    actual_end_time:{type:Date},
    extra_times:{type:number, required:true,max:5}
}),

scheduleModel = mongoose.model('Schedule',scheduleSchema);

module.exports = scheduleModel;