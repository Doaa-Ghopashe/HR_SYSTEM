const scheduleModel = require("../models/schedule");

const scheduleList = async (req, res) => {
  try {
    //pagination
    const queryObj = { ...req.query };
    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let query = bookModel.find(queryObj);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 30;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    //excute query
    const book = await query
      .populate({
        path: "AuthorId",
      })
      .populate({
        path: "categoryId",
      });
     //const book = await bookModel.find({});
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};

const userScheduleList = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.find({ _id: id });
    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      err: error.message,
    });
  }
};

// const addNewBook = async (req, res) => {

//   try {
//     let newBook ={
//               title: req.body.title,
//               desc: req.body.desc,
//               AuthorId: req.body.AuthorId,
//               categoryId: req.body.categoryId,
//               photo:req.file.path
//             //  photo:img
//           }
//     const addBook = await bookModel.create(
//       newBook
     
//     );
//     res.status(200).json({
//       status: "success",
//       data: {
//         addBook,
//         //photo: req.file.path
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "failed",
//       err: error.message,
//     });
//   }
// };

const editSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const data = {...req.body};
    const Book = await bookModel.findOneAndUpdate({ _id: id }, data, {new: true});
    res.status(200).json({
      status: "success",
      data: "Updated Book successfully",
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
 editSchedule
};
