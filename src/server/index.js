const express = require("express");

const logger = require("../config/logger");
const gConfig = require("../config/conf.json");

const app = express();
module.exports.start = async () => {
  app.use(express.json());
  await require("../routes/startExperiment")(app);
  app.listen(gConfig.server.port);
  logger.info(
    `Server for Performance Analysis purposes up and running at http://${gConfig.server.host}:${gConfig.server.port}`
  );
};
