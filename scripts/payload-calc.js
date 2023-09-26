const axios = require("axios");

const generatePayload = (config) => {
  //const config = gConfig[type];

  let payload = { timestamp: getCurrentTimestamp() };
  if (config.withFeatures) {
    const features = generateFeatures(config.features);
    payload = { ...features, ...payload };
  } else {
    payload.measurements = Array.from({ length: config.samples }, generateRandomMeasurement);
  }

  return payload;
};

function generateRandomMeasurement() {
  return {
    x: 0.9460024828235403,
    y: 0.9460024828235403,
    z: 0.9460024828235403,
  };
}

function generateFeatures(numberOfFeatures) {
  const features = {};
  for (let i = 0; i < numberOfFeatures; i++) {
    features[`feature${String.fromCharCode(65 + i)}`] = 0.9460024828235403;
  }
  return features;
}

function getCurrentTimestamp() {
  return Date.now();
}
const samples = 6;

const config = {
  withFeatures: true,
  url: "http://localhost:3000/calc",
  perEdgeNode: 3,
  samples: samples,
  features: samples,
  periodicity: 3600000,
};
let acc = 0;
let i = 0;
const payload = generatePayload(config);
const payloadSizeInBytes = Buffer.from(JSON.stringify(payload)).byteLength; //179683
acc += payloadSizeInBytes;
console.log(`payload size: ${payloadSizeInBytes} bytes`);

/* const headers = {};
headers["Accept"] = "application/json";
axios.post(config.url, payload, {
  headers,
}).then(console.log); */

//console.log(`AVERAGE SIZE IS  ${acc / i} bytes`);
const constantPayload = config.withFeatures
  ? Buffer.from('{"timestamp":1695743739412,}').byteLength
  : Buffer.from('{"timestamp":1695743739412,"measurements":[]}').byteLength;

const stringPerMeasurement = config.withFeatures
  ? Buffer.from("'featureA':0.9460024828235403,").byteLength
  : Buffer.from("{'x':0.9460024828235403,'y':0.9460024828235403,'z':0.9460024828235403},")
      .byteLength; //179683
console.log(constantPayload);
console.log(stringPerMeasurement);
console.log(constantPayload + stringPerMeasurement * samples - 1);
