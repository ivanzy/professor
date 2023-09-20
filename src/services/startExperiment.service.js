const logger = require("../config/logger");
const performRequest = require("./performRequest");
const gConfig = require("../config/conf.json");
const randomGenerator = require("../utils/randomGenerator");
const intervalManager = require("../utils/intervalManager");

const start = ({ url, numberOfEdges, name, withFeatures }) => {
  logger.info(`Going to create ${numberOfEdges} edge nodes`);
  for (let i = 0; i < numberOfEdges; i++) {
    createDevices("accelerometer", url, name, withFeatures);
    createDevices("acousticEmission", url, name, withFeatures);
  }
};

createDevices = (type, url, name, withFeatures) => {
  const config = gConfig[type];
  for (let i = 0; i < config.perEdgeNode; i++) {
    const initialPeriodicity = randomGenerator.getRandomInt(config.periodicity);
    logger.info(`setting ${type} sensors with ${initialPeriodicity}s as initial periodicity`);
    setTimeout(() => {
      performRequest(type, url, name, withFeatures);
      const id = setInterval(() => {
        performRequest(type, url, name, withFeatures);
      }, config.periodicity);
      intervalManager.addIntervalId(id);
    }, initialPeriodicity);
  }
};
module.exports = start;
