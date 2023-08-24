const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema(
    {
        employee_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "employee", unique: false },
        status: { type: String },
        date: { type: String, required: true },
        shiftStartTime: { type: String, required: true },
        shiftEndTime: { type: String, required: true },
        actualStartTime: { type: String },
        actualEndTime: { type: String },
        isVaction:{type:Boolean}
    }
);

scheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = scheduleModel;