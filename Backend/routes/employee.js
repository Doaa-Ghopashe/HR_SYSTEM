const express = require('express'),

    employeeController = require('../controllers/employeeController'),

    router = express.Router(),

    { addEmployeeValidator } = require('../Middleware/validators/validator.js'),

    { validate } = require('../Middleware/validation/validator.js');

router.get('/', employeeController.list);

router.get('/:id', employeeController.getById);

router.post('/', validate(addEmployeeValidator), employeeController.add);

router.put('/:id', employeeController.edit);

module.exports = router;