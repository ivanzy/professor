const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = (type, name, config) => {
  logger.info(`${type} - ${config.url}`);
  const headers = headerFactory.post();
  const hrstart = process.hrtime();
  const payload = generatePayload(config);
  const response = axios.post(config.url, payload, {
    headers,
  });
  return response
    .then((res) => {
      logger.info(`Response Status: ${res.status}`);
      record(name, type, res.status, process.hrtime(hrstart));
      return res;
    })
    .catch(
      (error) => {
        if (error.response) {
          record(name, type, error.response.status, process.hrtime(hrstart));
        } else {
          resultHandler.errorHandler(error);
        }
      }
    );
};

module.exports = performRequest;
