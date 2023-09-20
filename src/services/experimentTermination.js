const logger = require("../config/logger");
const intervalManager = require("../utils/intervalManager");

const experimentTermination = () => {
  logger.info(`terminating the experiment...`);
  const ids = intervalManager.getIntervalIds();
  for (const id of ids) clearInterval(id);
};

module.exports = experimentTermination;
