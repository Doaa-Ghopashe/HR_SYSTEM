const express = require('express');
const employeeController = require('../controllers/employeeController')
const router = express.Router();
const{addEmployeeValidator,updateEmployeeValidator}=require('../validators/validator.js');
const{validate}= require('../Middleware/validation/validator.js')

router.get('/', employeeController.list);

router.get('/:id', employeeController.getById);

router.post('/',
    validate(addEmployeeValidator)
    , employeeController.add);

router.put('/:id',
    validate(updateEmployeeValidator),
    employeeController.edit);

module.exports = router;