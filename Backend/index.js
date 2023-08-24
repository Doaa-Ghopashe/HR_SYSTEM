//reqiures
require('dotenv').config();

const express = require('express'); 

    mongoose = require('mongoose'),

    cors = require('./Middleware/corsmiddelware'),

    employee = require('./routes/employee'),

    schedule = require('./routes/schedule'),

    app_server = express(),

    PORT = process.env.SERVER_PORT,

    Mongoose_URL = process.env.MONGOOES_URL;


app_server.use(express.json());

app_server.use(cors);

app_server.use('/employees',  employee);

app_server.use('/scheduler', schedule);



app_server.listen(PORT, (err) => {
    if (!err) return console.log("the server is being listened on port " + PORT);

    return console.log(err);
})

mongoose.connect(Mongoose_URL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false }, (err) => {
    if (!err) return console.log("the database is connected");
    
    return console.log(err);
})







