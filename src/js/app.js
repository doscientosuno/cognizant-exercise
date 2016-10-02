'use strict';

// Angular and Angoular route libraries
var angular = require('angular');
require('angular-route');

// App components
var services = require('./services.js');
var directives = require('./directives.js');
var controllers = require('./controllers.js');
var filters = require('./filters.js');

// We define dynamically the app components: services, directives, controllers and filters
var components = angular.module('components', ['ng']);
for (var i in services) { components.service(i, services[i]) }
for (var i in directives) { components.directive(i, directives[i]) }
for (var i in controllers) { components.controller(i, controllers[i]) }
for (var i in filters) { components.filter(i, filters[i]) }

var app = angular.module('sensors', [
  'components',
  'ngRoute'
]).config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/tpl/main.html',
    controller: 'mainCtrl'
  })
  .when('/sensors/:sensorId', {
    templateUrl: '/tpl/sensor-view.html',
    controller: 'sensorCtrl'
  })
  .otherwise({ redirectTo: '/' });
});
