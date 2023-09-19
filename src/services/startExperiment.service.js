const logger = require("../config/logger");
const performRequest = require("./performRequest");
const gConfig = require("../config/conf.json");
const chooseMethod = require("../utils/chooseMethod");
const randomGenerator = require("../utils/randomGenerator");

//* wait a exponential time and perform a call to the service
const start = async ({
  url,
  numberOfEdges,
  name,
  wot = false,
}) =>
  await new Promise((resolve, reject) => {
    const periodicity = gConfig.periodicity;
    for (let i = 0; i < numberOfEdges; i++) {
      //create three acc
      for (
        let i = 0;
        i < gConfig.numberOfAccelerometersPerEdge;
        i++
      ) {
        setTimeout(() => {
          performRequest.accelerometer(url, name, wot);
          resolve();
        }, randomGenerator.getRandomInt(periodicity));
      }

      for (
        let i = 0;
        i < gConfig.numberOfAcousticEmissionSensorsPerEdge;
        i++
      ) {
        setTimeout(() => {
          performRequest.acoustic(url, name, wot);
          resolve();
        }, randomGenerator.getRandomInt(periodicity));
      }
    }

    logger.info(
      `Going to perform a ${method} call in ${(
        time / 1000
      ).toFixed(2)}s`
    );
  });

module.exports = start;
