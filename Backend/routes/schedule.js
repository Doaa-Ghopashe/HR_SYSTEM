const express = require('express'),

    reservedBookRouter = express.Router(),

    scheduleController = require('../controllers/scheduleController');

reservedBookRouter.get('/:id', scheduleController.scheduleList);

reservedBookRouter.get('/', scheduleController.userScheduleList);

reservedBookRouter.post('/', scheduleController.addSchedule);

reservedBookRouter.put('/:id', scheduleController.editSchedule);

module.exports = reservedBookRouter;