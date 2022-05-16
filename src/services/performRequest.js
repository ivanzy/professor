const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const drHarvesterClient = require("./drHarvester.service");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = {
  async harvester({ harvester }, name) {
    logger.info(`DrHarvester Simulation at ${harvester}`);
    const hrstart = process.hrtime();
    const simulationId =
      await drHarvesterClient.postSimulation(
        harvester,
        generatePayload(1)
      );
    const simulation =
      await drHarvesterClient.getSimulationResult(
        harvester,
        simulationId
      );
    logger.info(
      `SIMULATION FINISHED - attempts: ${simulation.count}`
    );
    record(name, process.hrtime(hrstart));
    return;
  },
};

module.exports = performRequest;
