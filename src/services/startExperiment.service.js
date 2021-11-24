const logger = require("../config/logger");
const performRequest = require("./performRequest");
const chooseMethod = require("../utils/chooseMethod");
const exponentialGenerator = require("../utils/randomGenerator");

//* wait a exponential time and perform a call to the service
const start = async ({ url, lambda, name, wot=false }) =>
  await new Promise((resolve, reject) => {
    const time = exponentialGenerator(lambda) * 1000;
    const method = chooseMethod();

    logger.info(
      `Going to perform a ${method} call in ${(
        time / 1000
      ).toFixed(2)}s`
    );

    setTimeout(() => {
      performRequest[chooseMethod()](url, name, wot);
      resolve();
    }, time);
  });

module.exports = start;
