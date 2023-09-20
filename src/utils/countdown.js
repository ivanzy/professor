const logger = require("../config/logger");

const countdown = async (seconds, initialFunction, payload, terminationFunction) => {
  initialFunction(payload);
  logger.info(`experiment started...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

module.exports = countdown;
