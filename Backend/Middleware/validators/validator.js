const { body, check } = require('express-validator');

const addEmployeeValidator = [
    body('firstname').isString().withMessage("this field accept string only")
        .notEmpty().withMessage("this field is required")
        .isLength({ min: 3 }).withMessage("Min length is 3")
        .isLength({ max: 10 }).withMessage("Max length is 10"),
    body('lastname').isString().withMessage("this field accept string only")
        .notEmpty().withMessage("this field is required")
        .isLength({ min: 3 }).withMessage("Min length is 3")
        .isLength({ max: 10 }).withMessage("Max length is 10"),

    body('email').isString().withMessage("this field accept string only")
        .isEmail().withMessage("the pattern should be user@example.com"),

    body('role').isString().withMessage("this field accept string only"),

]

module.exports = { addEmployeeValidator }