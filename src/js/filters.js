'use strict';

// getMin filter. It gets an array and returns its minimum value
module.exports.getMin = function () {
  return function (array) {
    if (array.length === 0) return null;
    return Math.min.apply(Math, array);
  }
};

// getMax filter. It gets an array and returns its maximum value
module.exports.getMax = function () {
  return function (array) {
    if (array.length === 0) return null;
    return Math.max.apply(Math, array);
  }
};
