const scheduleModel = require("../models/schedule"),

  searchExistence = async (req, res) => {
    try {
      const { id } = req.params;
      const targetDate = req.body.date;

      const schedule = await scheduleModel.findOne({ employee_id: id, date: targetDate });
      if (schedule) {
        res.status(200).json({
          status: "success",
          data: schedule,
        });
      } else {
        res.status(200).json({
          status: "success",
          data: false,
        });
      }
    } catch (error) {
      res.status(401).json({
        status: "failed",
        err: error.message,
      });
    }
  },

  userScheduleList = async (req, res) => {
    try {
      const { id } = req.params;
      const userSchedule = await scheduleModel.find({ employee_id: id });
      res.status(200).json({
        status: "success",
        data: { userSchedule },
      });
    } catch (error) {
      res.status(401).json({
        status: "failed",
        err: error.message,
      });
    }
  },

  addSchedule = async (req, res) => {
    try {
      let newDay = {
        date: (req.body.month < 10 ? "0" : "") + req.body.month + '-' + (req.body.day < 10 ? "0" : "") + req.body.day + '-' + req.body.year,
        shiftStartTime: req.body.shiftStartTime,
        isVacation: req.body.isVacation,
        shiftEndTime: req.body.shiftEndTime,
        actualStartTime: req.body.actualStartTime,
        actualEndTime: req.body.actualEndTime,
        status: req.body.status,
        employee_id: req.body.employee_id
      }
      const addAttendance = await scheduleModel.create({ ...newDay });

      res.status(200).json({
        status: "success",
        data: {
          addAttendance,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        err: error.message,
      });
    }
  },

  editSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      const targetDate = (req.body.month < 10 ? "0" : "") + req.body.month + '-' + (req.body.day < 10 ? "0" : "") + req.body.day + '-' + req.body.year;
      const data = {
        status: req.body.status,
        shiftStartTime: req.body.shiftStartTime,
        shiftEndTime: req.body.shiftEndTime,
        actualStartTime: req.body.actualStartTime,
        actualEndTime: req.body.actualEndTime
      };
      await scheduleModel.findOneAndUpdate({ employee_id: id, date: targetDate }, data, { new: true });
      res.status(200).json({
        status: "success",
        data: "Updated schedule successfully",
      });
    } catch (error) {
      res.status(401).json({
        status: "failed",
        err: error.message,
      });
    }
  };

module.exports = {
  userScheduleList,
  editSchedule,
  addSchedule,
  searchExistence
};
