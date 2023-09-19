const exponentialGenerator = (
  lambda,
  random = Math.random()
) => Math.log(1 - random) / (-1 * lambda);

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

module.exports = { exponentialGenerator, getRandomInt };
