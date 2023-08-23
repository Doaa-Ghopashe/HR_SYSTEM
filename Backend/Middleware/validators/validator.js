const  { body ,check} = require('express-validator');
const addEmployeeValidator=[
    body('title').isString().withMessage("this field accept string only")
                 .notEmpty().withMessage("this field is required")
                 .isLength({min:3}).withMessage("Min length is 3"),

    body('categoryId').isMongoId().withMessage("this field is required"),
    body('AuthorId').isMongoId().withMessage("this field is required"),
    // body('photo').notEmpty().withMessage("this field is required"),
    body('desc').isString().withMessage("this field accept string only")
                .notEmpty().withMessage("this field is required")
                .isLength({min:3}).withMessage("Min length is 3"),
]

const updateEmployeeValidator = [
check('title')
.optional()
.notEmpty().withMessage("this field is required")
.isLength({min:3}).withMessage("Min length is 3"),

check('categoryId')
.optional()
.isMongoId().withMessage("this field is required"),

check('AuthorId')
.optional()
.isMongoId().withMessage("this field is required"),

check('photo')
.optional()
.isString().withMessage("this field is required"),

check('desc')
.optional()
.isString().withMessage("this field accept string only")
 .notEmpty().withMessage("this field is required")
 .isLength({min:10}).withMessage("Min length is 3"),

];
module.exports={addEmployeeValidator,updateEmployeeValidator}