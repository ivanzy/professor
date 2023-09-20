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
  const response = axios.post(
    url,
    generatePayload(type, withFeatures),
    {
      headers,
    }
  );
  return response
    .then(() => record(name, type, process.hrtime(hrstart)))
    .catch(resultHandler.errorHandler);
};

module.exports = performRequest;
