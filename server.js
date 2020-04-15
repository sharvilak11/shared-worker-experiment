const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));

app.use(cors());

app.listen(port, function () {
    console.log("App initiated at port " + port);
});

const io = require('./sockets');

//TODO:
//  io.sockets.sockets - Keep track of all sockets through this property.
//  Write an api which checks all socket connections concurrently connected to the server
//  Call that api from front-end periodically within specified time interval - may be every 5 seconds

exports = module.exports = app;

