const gConfig = require("../config/conf.json");

const generatePayload = (type, withFeatures) => {
  const config = gConfig[type];

  const timestamp = getCurrentTimestampInNanoseconds();
  const payload = { timestamp: timestamp.toString() };
  if (withFeatures) {
    const features = generateFeatures(config.features);
    payload = { ...features, ...payload };
  } else {
    payload.measurements = Array.from(
      { length: config.samples },
      generateRandomMeasurement
    );
  }

  return payload;
};

function generateRandomMeasurement() {
  return {
    x: Math.random(),
    y: Math.random(),
    z: Math.random(),
  };
}

function generateFeatures(numberOfFeatures) {
  const features = {};
  for (let i = 0; i < numberOfFeatures; i++) {
    features[`feature${String.fromCharCode(65 + i)}`] = 0;
  }
  return features;
}

function getCurrentTimestampInNanoseconds() {
  const hrtime = process.hrtime();
  return BigInt(hrtime[0] * 1e9 + hrtime[1]);
}

module.exports = generatePayload;
