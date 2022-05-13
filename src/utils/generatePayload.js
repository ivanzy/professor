const generatePayload = () => ({
  devId: "teste",
  harvId: "SolarHeavyLoad",
  lowpwrI: 400,
  activeI: 715,
  duty: getRandomInt(1,100),
  Vload: 5,
  devAvgI: null,
  batSOC: null,
  batV: getRandomInt(200,400)/100,
  phIrr: getRandomInt(0,1000),
  thThot: null,
  thTcold: null,
  thGrad: null,
  vibAcc: null,
  vibFreq: null,
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


module.exports = generatePayload;
