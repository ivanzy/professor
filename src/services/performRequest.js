const logger = require("../config/logger");

const drHarvesterClient = require("./drHarvester.service");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");
const random = require("../utils/randomGenerator");

const performRequest = {
  async harvester({ harvester, devices }, name, time) {
    logger.info(`DrHarvester Simulation at ${harvester}`);
    const hrstart = process.hrtime();
    const simulationId =
      await drHarvesterClient.postSimulation(
        harvester,
        generatePayload(
          random.getRandomInt(1, devices),
          time
        )
      );
    const simulation =
      await drHarvesterClient.getSimulationResult(
        harvester,
        simulationId
      );
    record(name, process.hrtime(hrstart));
    return;
  },
  async cacheHarvester({ harvester, devices }, date) {
    const simulationId =
      await drHarvesterClient.postSimulation(harvester, {
        isCache: true,
        ...generatePayload(
          random.getRandomInt(1, devices),
          date
        ),
      });
    const simulation =
      await drHarvesterClient.getSimulationResult(
        harvester,
        simulationId,
        true
      );
    logger.info(
      `lifetime: ${simulation.simulation.result.batlifeh}`
    );
    return;
  },
};

module.exports = performRequest;
