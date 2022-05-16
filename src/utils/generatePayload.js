const logger = require("../config/logger");
const random = require("../utils/randomGenerator");
const irradiances =
  require("../../assets/Timeseries_44.529_11.324_SA2_2a_2020_2020.json")
    .outputs.hourly;

const devices = {};

const generatePayload = (devId, date) => {
  if (!date) {
    date = new Date();
    process.exit();
  }
  if (devices[devId]) {
    devices[devId].updateParamenters(new Date(date));
  } else {
    logger.info(
      "--------------- NEW DEVICE ---------------"
    );
    devices[devId] = new DrHarvesterInput(
      devId,
      100,
      random.getRandomInt(1, 100),
      new Date(date)
    );
    logger.info(
      "------------------------------------------"
    );
  }
  //logger.info(devices[devId]);
  return devices[devId];
};

class DrHarvesterInput {
  #timestamp;
  #battery;
  constructor(
    id,
    batSOC,
    duty,
    date,
    harvId = "SolarHeavyLoad"
  ) {
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
    this.#timestamp = date;
    this.phIrr = this.getIrradiance();
    this.#battery = this.calculateBattery();
    logger.info(
      `device ${id} - ${this.#timestamp.toString()}`
    );
  }
  getIrradiance() {
    const searchIrradianceHour = `2020${this.formatNumber(
      this.#timestamp.getMonth() + 1
    )}${this.formatNumber(
      this.#timestamp.getDate()
    )}:${this.formatNumber(this.#timestamp.getHours())}10`;
    const realIrradiance = irradiances.filter(
      (irradiance) =>
        irradiance["time"] === searchIrradianceHour
    )[0];
    logger.info(
      `time: ${searchIrradianceHour} irr: ${realIrradiance["G(i)"]}`
    );
    return realIrradiance["G(i)"];
  }

  formatNumber(number) {
    return new Intl.NumberFormat("en-IN", {
      minimumIntegerDigits: 2,
    }).format(number);
  }
  updateParamenters(currentTime) {
    logger.info("updating parameters...");
    logger.info(
      `old:${this.#timestamp.toString()}  new: ${currentTime.toString()}`
    );
    const timePassed =
      currentTime.getTime() - this.#timestamp.getTime();
    //this.#timestamp = currentTime;
    this.phIrr = this.getIrradiance();
    const updatedBattery = this.#battery - timePassed;
    logger.info(
      `time passed: ${timePassed / 1000}s, old battery: ${
        this.batSOC
      }%`
    );
    this.batSOC = Number.parseInt(
      (updatedBattery * this.batSOC) / this.#battery
    );
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
