const fs = require("fs");

const logger = require("../config/logger");

const record = (name, replication, type, httpStatus, time) => {
  const recordEntry = `${replication};${type};${httpStatus};${
    time[0] + time[1] / 1000000000
  }\n`;
  fs.appendFile(
    `src/experiments/${name}.csv`,
    recordEntry,
    (err) => {
      if (err) return console.log(err);
      logger.info(
        `new entry at ${name}.csv: ${recordEntry}`
      );
    }
  );
};

module.exports = record;
