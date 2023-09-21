const logger = require("../config/logger");
const countdown = require("../utils/countdown");
const experimentControl = require("../utils/experimentControl");
const validatePayload = require("../validations/payloadValidator");
const startService = require("../services/startExperiment.service");
const convertToCamelCase = require("../utils/camelCaseConvertor");
const experimentTermination = require("../services/experimentTermination");
const RequestCounterManager = require("../utils/RequestCounterManager");

const start = (req, res) => {
  try {
    //* check if an exp is already running
    if (experimentControl.isExperimentRunning()) throw { code: 503 };
    const payload = convertToCamelCase(req.body);
    //* check if payload is valid

    if (!validatePayload(payload)) throw { code: 404 };
    
    RequestCounterManager.reset();
    //* starting experiment
    experimentControl.start();
    //* execute startService for the experiment time (countdown)

    countdown(payload.time, startService, payload).then(() => {
      experimentTermination(payload);
      experimentControl.finish();
      logger.info(`Experiment ${payload.name} finished`);
    });
    res.status(200).send("experiment started");
  } catch (err) {
    if (err.code === 503) return res.status(503).send("An experiment is already being executed");
    if (err.code === 404) return res.status(404).send("Problem in payload structure");
    else return res.status(500).send(err);
  }
};

module.exports = start;
