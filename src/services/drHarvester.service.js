const axios = require("axios");

const config = require("../config/conf.json");
const logger = require("../config/logger");

const postSimulation = async (url, inputData) => {
  logger.info(
    `Querying DrHarvester for a new simulation - Irradiance: ${inputData.phIrr} - Bat%: ${inputData.batSOC}`
  );
  let { data } = await axios.post(
    `${url}/harvester/simulation`,
    inputData
  );
  logger.info(`Simulation response: ${data.jobId}`);
  return data.jobId;
};

const getSimulationResult = async (
  url,
  jobId,
  isCache = false
) => {
  let terminated = false;
  let simulation = null;
  try {
    do {
      if (!isCache) {
        logger.info(
          `Sleeping for ${config.requestInterval}s...`
        );
        await sleep(config.requestInterval);
      }
      logger.info(`Resquest to DrHarvester for ${jobId}`);
      let response = await axios.get(
        `${url}/harvester/simulation/${jobId}`
      );
      terminated = response.data.terminated;
      simulation = response.data;
    } while (!terminated);
    return { simulation: simulation };
  } catch (err) {
    return new Error(err.message);
  }
};

const sleep = (seconds) =>
  new Promise((resolve) =>
    setTimeout(resolve, seconds * 1000)
  );

module.exports = {
  getSimulationResult,
  postSimulation,
};
