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

    body('password').if((value, { req }) => req.body.role === 'hr').notEmpty().withMessage('Password is required'),
    body('password').if((value, { req }) => req.body.password).isString().withMessage('Password must be a string'),
    body('password').if((value, { req }) => req.body.password).isLength({ min: 8 }).withMessage('Password should be at least 8 characters long'),
]

const updateEmployeeValidator = [
    check('title')
        .optional()
        .notEmpty().withMessage("this field is required")
        .isLength({ min: 3 }).withMessage("Min length is 3"),

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
        .isLength({ min: 10 }).withMessage("Min length is 3"),

];
module.exports = { addEmployeeValidator, updateEmployeeValidator }