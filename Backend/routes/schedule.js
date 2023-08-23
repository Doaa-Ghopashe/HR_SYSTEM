const express=require('express'),

reservedBookRouter=express.Router(),

scheduleController=require('../controllers/reservedBooksController');

reservedBookRouter.get('/:id',scheduleController.getOneReservedBook);

reservedBookRouter.get('/',scheduleController.getAllReservedBooks);

reservedBookRouter.post('/',scheduleController.reserveBook);

reservedBookRouter.put('/:id',scheduleController.editReservedBook);

module.exports=reservedBookRouter;