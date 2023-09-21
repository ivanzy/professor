const logger = require("../config/logger");
const intervalManager = require("../utils/intervalManager");
const record = require("../utils/recordDataPoint").recordExperimentManagement;
const RequestCounterManager = require("../utils/RequestCounterManager");

const experimentTermination = ({ name, replication }) => {
  logger.info(`terminating the experiment...`);
  const ids = intervalManager.getIntervalIds();
  for (const id of ids) clearInterval(id);
  const recordEntry = `${name};${replication},${RequestCounterManager.getCounter()};${RequestCounterManager.getResponse()};${RequestCounterManager.pendingRequests()}`;
  record(recordEntry);
};

module.exports = experimentTermination;
