'use strict'

// Main Controller

module.exports.mainCtrl = function ($scope, socket, $timeout) {
  // Sensors data is retrieved via the socket service
  $scope.sensorsData = socket.getData();

  // Scope is upgraded every time the socket service broadcast new data
  $scope.$on('sensors.data', function ()  {
    $timeout(function () { $scope.sensorsData = socket.getData() });
  });

  // We also make available to the scope the clean and addSensor of the socket service methods.
  $scope.addSensor = socket.addSensor;
  $scope.cleanData = socket.clean;
};


// Sensor Controller

module.exports.sensorCtrl = function ($scope, socket, $routeParams, $timeout) {
  // It gets the sensor ID from the $routeParams and the sensor data from the socket service.
  $scope.index = $routeParams.sensorId;
  $scope.sensorData = socket.getData($scope.index);

  // It upgrades every time the socket broadcast new data.
  $scope.$on('sensors.data', function ()  {
    $timeout(function () { $scope.sensorData = socket.getData($scope.index) });
  });

  // It also make available the socket.setValue() method at the scope.
  $scope.setValue = socket.setValue;
};
