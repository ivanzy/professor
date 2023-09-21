const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = (type, name, replication, config) => {
  logger.info(`sending a ${type} data to ${config.url}`);
  const headers = headerFactory.post();
  const hrstart = process.hrtime();
  const payload = generatePayload(name, replication, config);
  const response = axios.post(config.url, payload, {
    headers,
  });

  //logger.info(`${JSON.stringify(payload)}`)
  return response
    .then((res) => {
      logger.info(`Response Status: ${res.status}`);
      record(name, replication, type, res.status, process.hrtime(hrstart));
      return res;
    })
    .catch((error) => {
      if (error.code === 'ECONNABORTED') {
        logger.info('Request **TIMEOUT** occurred');
        record(name, replication, type, -1, process.hrtime(hrstart)); 
      } else if (error.response) {
        logger.info('Error in request from server side');
        record(name, replication, type, error.response.status, process.hrtime(hrstart));
      } else {
        resultHandler.errorHandler(error);
      }
    });
};

module.exports = performRequest;
