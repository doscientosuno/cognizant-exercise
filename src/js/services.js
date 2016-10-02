'use strict'

/* Socket service
  This is the heart of the app. It communicate at real time with the server via Socket.io. Every time the server send data, it is stored as a JSON array at Local Storage, and all the stored data is broadcasted to the app. The socket service has one private and four public methods usable by the app controllers:
  - saveAndEmitData(): Private function. It saves the updated data at localStorege and broadcasts it to all the app components.
  - socket.clean(): Resets the data to the original 2 dimensions empty array.
  - socket.addSensor(): Add an empty array to the data array, as a new sensor to listen to.
  - socket.getData(): If no argument is provided, it returns the complete data array. If an integer is provided as argument, it returns the array that matches that index.
  - socket.setValue(): This method change the array value with the coordinates that matches the first and second arguments to the value provided by the third argument.
*/

var io = require('socket.io-client');
var port = require('../../config.js').port; // Use the port defined at config.js

module.exports.socket = function ($rootScope, $window) {
  var socket = io.connect('http://localhost:' + port);

  // Initialization
  var data = JSON.parse($window.localStorage.getItem('sensorsValues')) || [[], []];

  // Helper function to save and broadcast the data
  var saveAndEmitData = function () {
    $window.localStorage.setItem('sensorsValues', JSON.stringify(data));
    $rootScope.$broadcast('sensors.data', data);
  }

  // Appends new data to existent sensors data. If the data received is from a not listened sensor, nothing happens
  socket.on('data', function (d) {
    if (parseInt(d.id) < data.length) {
      if (data[d.id].length !== 0) {
        data[d.id].push(d.value);
      } else {
        data[d.id] = [d.value];
      }
      saveAndEmitData(d.id);
    }
  });

  return {
    // Reset sensors data to a clean array
    clean: function () {
      console.log('Reseting data...');
      data = [[],[]];
      saveAndEmitData();
    },
    // Increments the number of sensors to listen to
    addSensor: function () {
      console.log('Listening to sensor ' + data.length + '...');
      data[data.length] = [];
      saveAndEmitData();
    },
    // Returns some sensor array of data or all data if no index is specified
    getData: function (index) {
      if (index) { return data[index] }
      else { return data }
    },
    // Change the value of any existent sensor index
    setValue: function (sensor, index, value) {
      if (data[sensor] && typeof data[sensor][index] === 'number') {
        data[sensor][index] = value;
        saveAndEmitData();
      }
    }
  }
};
