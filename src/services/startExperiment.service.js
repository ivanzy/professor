const logger = require("../config/logger");
const performRequest = require("./performRequest");
const gConfig = require("../config/conf.json");
const randomGenerator = require("../utils/randomGenerator");

//* wait a exponential time and perform a call to the service
const start = async ({
  url,
  numberOfEdges,
  name,
  withFeatures,
}) =>
  await new Promise((resolve, reject) => {
    logger.info(
      `Going to create ${numberOfEdges} edge nodes`
    );
    for (let i = 0; i < numberOfEdges; i++) {
      createDevices(
        "accelerometer",
        url,
        name,
        withFeatures
      );
      createDevices(
        "acousticEmission",
        url,
        name,
        withFeatures
      );
    }
  });

createDevices = (type, url, name, withFeatures) => {
  const config = gConfig[type];
  for (let i = 0; i < config.perEdgeNode; i++) {
    setTimeout(() => {
      performRequest(type, url, name, withFeatures);
      resolve();
    }, randomGenerator.getRandomInt(config.periodicity));
  }
};

module.exports = start;
