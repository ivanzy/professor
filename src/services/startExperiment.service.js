const logger = require("../config/logger");
const performRequest = require("./performRequest");
const chooseMethod = require("../utils/chooseMethod");
const random = require("../utils/randomGenerator");

//* wait a exponential time and perform a call to the service
const cacheHistory = async ({ url, lambda, cacheTime }) => {
  logger.info(
    `DrHarvester filling the cache at ${url.harvester}`
  );
  const startDate = random.randomDate();
  let endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + cacheTime);
  logger.info(`start: ${startDate} end: ${endDate}`);
  let time = 0;
  for (
    let date = startDate;
    date.getTime() < endDate.getTime();
  ) {
    time = random.exponentialGenerator(lambda);
    date.setSeconds(date.getSeconds() + time);
    await performRequest["cacheHarvester"](url, date);
  }
  return endDate;
};

const start = async ({ url, lambda, name }) =>
  await new Promise((resolve, reject) => {
    const time = random.exponentialGenerator(lambda) * 1000;
    logger.info(
      `Going to perform a request in ${(
        time / 1000
      ).toFixed(2)}s`
    );
    
    setTimeout(() => {
      performRequest["harvester"](url, name, time);
      resolve();
    }, time);
  });

module.exports = { start, cacheHistory };
