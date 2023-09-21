const logger = require("../config/logger");
const intervalManager = require("../utils/intervalManager");
const record = require("../utils/recordDataPoint").recordExperimentManagement;
const RequestCounterManager = require("../utils/RequestCounterManager");
const experimentControl = require("../utils/experimentControl");
const experimentTermination = ({ name, replication }) => {
  logger.info(`terminating the experiment in 10s...`);
  setTimeout(() => {
    const ids = intervalManager.getIntervalIds();
    for (const id of ids) clearInterval(id);
    experimentControl.finish();
    const recordEntry = `${name};${replication},${RequestCounterManager.getCounter()};${RequestCounterManager.getResponse()};${RequestCounterManager.pendingRequests()}`;
    record(recordEntry);
  }, 10000);
};

module.exports = experimentTermination;
