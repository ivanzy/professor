const logger = require("../config/logger");
const irradiances =
  require("../../assets/Timeseries_44.529_11.324_SA2_2a_2020_2020.json")
    .outputs.hourly;

const devices = {};

const generatePayload = (devId) => {
  //if devId exist in the array, calculate battery and irradiance
  if (devices[devId]) devices[devId].updateParamenters();
  //if devId does not exist. Create it
  else
    devices[devId] = new DrHarvesterInput(
      devId,
      getRandomInt(1, 100),
      getRandomInt(1, 100)
    );
  logger.info(devices[devId]);
  return devices[devId];
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class DrHarvesterInput {
  #timestamp;
  #battery;
  constructor(id, batSOC, duty, harvId = "SolarHeavyLoad") {
    this.devId = id;
    this.harvId = harvId;
    this.lowpwrI = 400;
    this.activeI = 715;
    this.duty = duty;
    this.Vload = 5;
    this.devAvgI = null;
    this.batSOC = batSOC;
    this.batV = null;
    this.thThot = null;
    this.thTcold = null;
    this.thGrad = null;
    this.vibAcc = null;
    this.vibFreq = null;
    this.#timestamp = new Date();
    this.phIrr = this.getIrradiance();
    this.#battery = this.calculateBattery();
  }
  getIrradiance() {
    const searchIrradianceHour = `2020${this.formatNumber(
      this.#timestamp.getMonth() + 1
    )}${this.formatNumber(
      this.#timestamp.getDate()
    )}:${this.formatNumber(this.#timestamp.getHours())}10`;
    console.log(searchIrradianceHour);
    const realIrradiance = irradiances.filter(
      (irradiance) =>
        irradiance["time"] === searchIrradianceHour
    )[0];
    console.log(realIrradiance["G(i)"]);
    return realIrradiance["G(i)"];
  }

  formatNumber(number) {
    return new Intl.NumberFormat("en-IN", {
      minimumIntegerDigits: 2,
    }).format(number);
  }
  updateParamenters() {
    logger.info("updating parameters...");
    // logger.info(`data:${this.#timestamp.toString()} current hour: ${this.#timestamp.getHours()}`)
    const currentTime = new Date();
    const timePassed =
      currentTime.getTime() - this.#timestamp.getTime();
    this.#timestamp = currentTime;
    this.phIrr = this.getIrradiance();
    const updatedBattery = this.#battery - timePassed;
    logger.info(
      `time passed: ${timePassed / 1000}s, old battery: ${
        this.batSOC
      }%`
    );
    this.batSOC =
      (updatedBattery * this.batSOC) / this.#battery;
    this.#battery = updatedBattery;
    logger.info(`new battery: ${this.batSOC}`);
  }

  calculateBattery() {
    const misteriousData =
      -0.424 * this.phIrr + (648 + 5.8 * this.duty);

    let batlifeh =
      (3250 * (this.batSOC / 100)) /
      Math.abs(misteriousData);

    if (this.duty == 0) batlifeh *= 1.1;
    batlifeh = batlifeh * 3600000;
    return batlifeh;
  }
}

module.exports = generatePayload;
