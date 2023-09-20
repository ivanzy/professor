const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = (type, url, name, withFeatures) => {
  logger.info(`${type} - ${url}`);
  const headers = headerFactory.post();
  const hrstart = process.hrtime();
  const payload = generatePayload(type, withFeatures);
  const response = axios.post(url, payload, {
    headers,
  });
  return response
    .then((res) => {
      logger.info(`Response Status: ${res.status}`);
      record(name, type, res.status, process.hrtime(hrstart));
      return res;
    })
    .catch(resultHandler.errorHandler);
};

module.exports = performRequest;
