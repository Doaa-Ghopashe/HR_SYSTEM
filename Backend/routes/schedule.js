const express = require('express'),

    scheduleController = require('../controllers/scheduleController'),

    router = express.Router();


router.get('/:id', scheduleController.userScheduleList);

router.post('/:id', scheduleController.searchExistence);

router.post('/', scheduleController.addSchedule);

router.put('/:id', scheduleController.editSchedule);

module.exports = router;