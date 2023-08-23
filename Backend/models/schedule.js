const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema(
    {
        employee_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "employee", unique: false },
        status: { type: String },
        date: { type: Date, required: true },
        shift_start_time: { type: Date, required: true },
        shift_end_time: { type: Date, required: true },
        actual_start_time: { type: Date },
        actual_end_time: { type: Date },
    },
    { timestamps: true }
);


scheduleSchema.virtual('extra_times').get(function () {
    const shiftEndTime = this.shift_end_time;
    const actualEndTime = this.actual_end_time;

    if (shiftEndTime && actualEndTime) {
        const timeDifference = actualEndTime.getTime() - shiftEndTime.getTime();
        const extraTimes = Math.ceil(timeDifference / (1000 * 60 * 15));
        return extraTimes;
    }

    return 0;
})

scheduleModel = mongoose.model('Schedule', scheduleSchema);

module.exports = scheduleModel;