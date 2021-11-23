const logger = require("../config/logger");
const startController = require("../controllers/startExperiment.controller");

const start = (router) => {
  router.route("/start").post((req, res) => {
    logger.info("received a POST request at /start");
    logger.debug(req.body);
    return startController(req, res);
  });
};

module.exports = start;
