/**
  Server script.
  Based on Express to serve the angular app and on socket.io to send randomly generated sensor values in real time.
*/

var express = require('express');
var http = require('http');
var socketIo = require('socket.io');
var config = require('./config.js');

// Express instance and port variable set
var app = express();

// Set the public folder, where the angular app is
app.use('/', express.static(__dirname + '/public/'));

// Start the server
var server = http.createServer(app).listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});

// Start the socket
var io = socketIo.listen(server);
io.on('connection', function (socket) {
  console.log('User connected');
});

// Send an object with the key as the sensor number and the value as itself
var emitNumber = function () {
  io.emit('data', {
    id: Math.round(Math.random() * config.number) + '',
    value: Math.round(Math.random() * config.max)
  });
};

// IIF calls itself every randomly set interval
(function loop () {
  var randomTimeout = Math.round(Math.random() * (config.maxTimeout - config.minTimeout)) + config.minTimeout;
  setTimeout(function () {
    emitNumber();
    loop();
  }, randomTimeout);
}());
