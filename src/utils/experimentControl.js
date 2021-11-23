let experimentRunning = false;

const finish = () => {
  experimentRunning = false;
};

const start = () => {
  experimentRunning = true;
};

const isExperimentRunning = () => experimentRunning;

module.exports = {
  finish,
  start,
  isExperimentRunning,
};
