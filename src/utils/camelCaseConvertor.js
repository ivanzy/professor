const _ = require("lodash");

const convertToCamelCase = (jsonObj) => {
  return _.mapKeys(jsonObj, (value, key) =>
    _.camelCase(key)
  );
};
module.exports = convertToCamelCase;
