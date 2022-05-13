const axios = require("axios");

const config = require("../config/conf.json");
const logger = require("../config/logger");

const postSimulation = async (url, inputData) => {
  logger.info(
    `Querying DrHarvester for a new simulation - Irradiance: ${inputData.phIrr} - batV: ${inputData.batV}`
  );
  let { data } = await axios.post(
    `${url}/harvester/simulation`,
    inputData
  );
  logger.info(`Simulation response: ${data.jobId}`);
  return data.jobId;
};

const getSimulationResult = async (url, jobId) => {
  let terminated = false;
  let simulation = null;
  try {
    let i = 0;
    do {
      i++;
      logger.info(
        `Sleeping for ${config.requestInterval}s...`
      );
      await sleep(config.requestInterval);
      logger.info(`Resquest to DrHarvester for ${jobId}`);
      let response = await axios.get(
        `${url}/harvester/simulation/${jobId}`
      );
      console.log(response.data);
      terminated = response.data.terminated;
      simulation = response.data;
    } while (!terminated);
    return { simulation: simulation, count: i };
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
