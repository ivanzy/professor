const logger = require("../config/logger");
const performRequest = require("./performRequest");
const chooseMethod = require("../utils/chooseMethod");
const random = require("../utils/randomGenerator");

//* wait a exponential time and perform a call to the service
const cacheHistory = async ({ url, lambda, cacheTime }) => {
  logger.info(
    `DrHarvester feeling the cache at ${url.harvester}`
  );

  const startDate = random.randomDate();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + cacheTime);
  logger.info(`start: ${startDate} end: ${endDate}`);
  const times = [];
  let time = 0;
  for (
    let date = startDate;
    date.getTime() <= endDate.getTime();
  ) {
    time = random.exponentialGenerator(lambda);

    times.push(time);
    date.setSeconds(date.getSeconds() + time);
    await performRequest["cacheHarvester"](url, date);
  }
  return times;
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
      performRequest["harvester"](url, name);
      resolve();
    }, time);
  });

module.exports = { start, cacheHistory };
