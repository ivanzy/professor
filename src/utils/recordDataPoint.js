const fs = require("fs");

const logger = require("../config/logger");

const recordDataPoint = (name, replication, type, httpStatus, time) => {
  const recordEntry = `${replication};${type};${httpStatus};${time[0] + time[1] / 1000000000}\n`;
  fs.appendFile(`src/experiments/${name}.csv`, recordEntry, (err) => {
    if (err) return console.log(err);
    logger.info(`new entry at ${name}.csv: ${recordEntry}`);
  });
};

const recordExperimentManagement = (recordEntry) => {
  fs.appendFile(`src/experiments/experiment_management.csv`, recordEntry, (err) => {
    if (err) return console.log(err);
    logger.info(`new entry management entry: ${recordEntry}`);
  });
};

module.exports = { recordDataPoint, recordExperimentManagement };
