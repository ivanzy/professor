const methodDistribution = require("../config/method.json");

const chooseMethod = () => {
  const randomNumber = Math.random();
  let threshold = methodDistribution.get;
  if (randomNumber < threshold) return "get";
  threshold += methodDistribution.post;
  if (randomNumber < threshold) return "post";
  threshold += methodDistribution.delete;
  if (randomNumber < threshold) return "delete";
  threshold += methodDistribution.put;
  if (randomNumber < threshold) return "put";
  return "patch";
};

module.exports = chooseMethod;
