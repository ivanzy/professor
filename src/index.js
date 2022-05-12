const logger = require("./config/logger");
const server = require("./server");


const init = async () => server.start();

init()
  .catch((err) => {
    logger.error({ err: err });
  });
