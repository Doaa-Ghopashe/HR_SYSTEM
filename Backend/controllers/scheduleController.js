const scheduleModel = require("../models/schedule"),

  scheduleList = async (req, res) => {
    // try {
    //   //pagination
    //   const queryObj = { ...req.query };
    //   const excludedFields = ["page", "limit"];
    //   excludedFields.forEach((el) => delete queryObj[el]);
    //   let query = bookModel.find(queryObj);
    //   const page = req.query.page * 1 || 1;
    //   const limit = req.query.limit * 1 || 30;
    //   const skip = (page - 1) * limit;
    //   query = query.skip(skip).limit(limit);
    //   //excute query
    //   const book = await query
    //     .populate({
    //       path: "AuthorId",
    //     })
    //     .populate({
    //       path: "categoryId",
    //     });
    //   //const book = await bookModel.find({});
    //   res.status(200).json({
    //     status: "success",
    //     data: { book },
    //   });
    // } catch (error) {
    //   res.status(401).json({
    //     status: "failed",
    //     err: error.message,
    //   });
    // }
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
        date: req.body.date,
        shift_start_time: req.body.shiftstart,
        shift_end_time: req.body.shiftend,
        actual_start_time: req.body.actualstart,
        actual_end_time: req.body.actualend,
        status: req.body.status
      }

      const addAttendance = await scheduleModel.create(newDay);

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
      const targetDate = req.body.date;
      const data = {
        status: req.body.status,
        shift_start_time: req.body.shiftstart,
        shift_end_time: req.body.shiftend,
        actual_start_time: req.body.actualstart,
        actual_end_time: req.body.actualend
      };
      const schedule = await scheduleModel.findOneAndUpdate({ employee_id: id, date: targetDate }, data, { new: true });
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
  scheduleList,
  userScheduleList,
  editSchedule,
  addSchedule
};
