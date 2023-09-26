const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint").recordDataPoint;
const RequestCounterManager = require("../utils/RequestCounterManager");

const performRequest = (type, name, replication, config) => {
  RequestCounterManager.incrementCounter();
  logger.info(`#${RequestCounterManager.getCounter()}: sending a ${type} data to ${config.url}`);
  const headers = headerFactory.post();
  const hrstart = process.hrtime();
  const payload = generatePayload(name, replication, config);
  const response = axios.post(config.url, payload, {
    headers,
  });


  const payloadSizeInBytes = Buffer.from(JSON.stringify(payload)).byteLength; //179683

  logger.info(`payload size: ${payloadSizeInBytes} bytes`);

  return response
    .then((res) => {
      RequestCounterManager.incrementResponse();
      logger.info(
        `Response Status: ${
          res.status
        } - pending requests: ${RequestCounterManager.pendingRequests()}`
      );
      record(name, replication, type, res.status, process.hrtime(hrstart));
      return res;
    })
    .catch((error) => {
      RequestCounterManager.incrementErrors();
      if (error.code === "ECONNABORTED") {
        logger.info("Request **TIMEOUT** occurred");
        record(name, replication, type, -1, process.hrtime(hrstart));
      } else if (error.response) {
        logger.info("Error in request from server side");
        record(name, replication, type, error.response.status, process.hrtime(hrstart));
      } else {
        logger.info("error without server response");
        record(name, replication, type, 0, process.hrtime(hrstart));

        //resultHandler.errorHandler(error);
      }
    });
};

module.exports = performRequest;
