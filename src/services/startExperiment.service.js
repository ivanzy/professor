const logger = require("../config/logger");
const performRequest = require("./performRequest");
const randomGenerator = require("../utils/randomGenerator");
const intervalManager = require("../utils/intervalManager");

const start = ({ numberOfEdges, name, replication, acousticEmission, accelerometer }) => {
  logger.info(`Going to create ${numberOfEdges} edge nodes`);
  for (let i = 0; i < numberOfEdges; i++) {
    createDevices("accelerometer", name, replication, accelerometer);
    createDevices("acousticEmission", name, replication, acousticEmission);
  }
};

createDevices = (type, name, replication, config) => {
  for (let i = 0; i < config.perEdgeNode; i++) {
    const initialPeriodicity = randomGenerator.getRandomInt(config.periodicity);
    logger.info(`setting ${type} sensors with ${initialPeriodicity}s as initial periodicity`);
    setTimeout(() => {
      performRequest(type, name, replication, config);
      const id = setInterval(() => {
        performRequest(type, name, replication, config);
      }, config.periodicity);
      intervalManager.addIntervalId(id);
    }, initialPeriodicity);
  }
};
module.exports = start;
