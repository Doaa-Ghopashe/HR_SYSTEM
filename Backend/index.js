//reqiures
require('dotenv').config();
const express = require('express');
const  mongoose = require('mongoose');
// const multer = require("multer");
const cors = require('./Middleware/corsmiddelware');
const user = require('./routes/user')
const employee = require('./routes/employee')
const  error_handler = require('./Middleware/errorhandler');

//constants
const app_server = express(),

PORT = process.env.SERVER_PORT,

Mongoose_URL = process.env.MONGOOES_URL;

//usage
app_server.use(express.json());

app_server.use(cors)

app_server.use(user)

app_server.use('/employess',employee)

app_server.use(error_handler)

// app_server.use(express.static('assets'));

//
app_server.listen(PORT,(err)=>{
    if(!err) return console.log("the server is being listened on port "+PORT);
    return console.log(err);
})

mongoose.connect(Mongoose_URL,{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err) return console.log("the database is connected");
    return console.log(err);
})







