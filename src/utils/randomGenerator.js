const exponentialGenerator = (
  lambda,
  random = Math.random()
) => Math.log(1 - random) / (-1 * lambda);

module.exports = exponentialGenerator;
