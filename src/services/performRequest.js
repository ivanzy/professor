const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = {
  get(url, name) {
    logger.info(`GET - ${url}`);
    const headers = headerFactory.get();
    const hrstart = process.hrtime();
    const response = axios.get(url, { headers });
    return response
      .then(() =>
        record(name, "get", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  post(url, name) {
    logger.info(`POST - ${url}`);
    const headers = headerFactory.post();
    const hrstart = process.hrtime();
    const response = axios.post(url, generatePayload(), {
      headers,
    });
    return response
      .then(() =>
        record(name, "post", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  put(url, name) {
    logger.info(`PUT - ${url}`);
    const headers = headerFactory.put();
    const hrstart = process.hrtime();
    const response = axios.put(url, generatePayload(), {
      headers,
    });
    return response
      .then(() =>
        record(name, "put", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  delete(url, name) {
    logger.info(`DELETE - ${url}`);
    const headers = headerFactory.delete();
    const hrstart = process.hrtime();
    const response = axios.delete(url, { headers });
    return response
      .then(() =>
        record(name, "delete", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  patch(url, name) {
    logger.info(`PATCH - ${url}`);
    const headers = headerFactory.patch();
    const hrstart = process.hrtime();
    const response = axios.patch(url, generatePayload(), {
      headers,
    });
    return response
      .then(() =>
        record(name, "patch", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
};

module.exports = performRequest;
