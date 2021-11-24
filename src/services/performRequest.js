const axios = require("axios");

const logger = require("../config/logger");
const headerFactory = require("../utils/headers");
const resultHandler = require("../utils/handlers/resultHandler");
const generatePayload = require("../utils/generatePayload");
const record = require("../utils/recordDataPoint");

const performRequest = {
  get({ get }, name) {
    logger.info(`GET - ${get}`);
    const headers = headerFactory.get();
    const hrstart = process.hrtime();
    const response = axios.get(get, { headers });
    return response
      .then(() =>
        record(name, "get", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  post({ post }, name) {
    logger.info(`POST - ${post}`);
    const headers = headerFactory.post();
    const hrstart = process.hrtime();
    const response = axios.post(post, generatePayload(), {
      headers,
    });
    return response
      .then(() =>
        record(name, "post", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  put({ put }, name) {
    logger.info(`PUT - ${put}`);
    const headers = headerFactory.put();
    const hrstart = process.hrtime();
    const response = axios.put(put, generatePayload(), {
      headers,
    });
    return response
      .then(() =>
        record(name, "put", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  //*delete is a reserved word
  delete(url, name, wot = false) {
    if (wot) return performRequest.post({ post: url.delete }, name);
    logger.info(`DELETE - ${url.delete}`);
    const headers = headerFactory.delete();
    const hrstart = process.hrtime();
    const response = axios.delete(url.delete, { headers });
    return response
      .then(() =>
        record(name, "delete", process.hrtime(hrstart))
      )
      .catch(resultHandler.errorHandler);
  },
  patch({ patch }, name, wot = false) {
    if (wot) return performRequest.put({ put: patch }, name);
    logger.info(`PATCH - ${patch}`);
    const headers = headerFactory.patch();
    const hrstart = process.hrtime();
    const response = axios.patch(patch, generatePayload(), {
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
