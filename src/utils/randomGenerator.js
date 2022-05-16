const exponentialGenerator = (
  lambda,
  random = Math.random()
) => Math.log(1 - random) / (-1 * lambda);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const randomDate = (
  start = new Date(2020, 0, 1),
  end = new Date(2020, 11, 30)
) =>
  new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  );

module.exports = {
  exponentialGenerator,
  getRandomInt,
  randomDate,
};
