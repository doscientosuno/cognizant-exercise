module.exports = {
  port: process.env.PORT || 3000,
  number: 10, // Number of sensors in the machine
  max: 100, // Max value of the sensors
  minTimeout: 200, // Min interval of time to send a value
  maxTimeout: 2000 // Max interval of time to send a value
};
