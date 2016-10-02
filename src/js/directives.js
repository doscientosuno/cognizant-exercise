'use strict';

module.exports.sensor = function () {
  return({
    scope: {
      index: '@',
      sensorData: '='
    },
    templateUrl: '/tpl/sensor.html'
  });
};
