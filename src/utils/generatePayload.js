//TODO: clean up this class after tests
const logger = require("../config/logger");
const random = require("../utils/randomGenerator");
const irradiances =
  require("../../assets/Timeseries_44.529_11.324_SA2_2a_2020_2020.json")
    .outputs.hourly;

const devices = [];
const startDate = random.randomDate();

const generatePayload = (devId, date) => {
  if (!date) {
    date = new Date();
  }

  if (devices[devId]) {
    //*workaround
    if (!(date instanceof Date)) {
      oldDate = devices[devId].getDate();
      oldDate.setMilliseconds(
        oldDate.getMilliseconds() + date
      );
      date = oldDate;
    }
    devices[devId].updateParamenters(new Date(date));
  } else {
    logger.info(
      "--------------- NEW DEVICE ---------------"
    );
    if (!(date instanceof Date)) {
      oldDate = new Date(startDate);
      oldDate.setMilliseconds(
        oldDate.getMilliseconds() + date
      );
      date = oldDate;
    }

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

  return devices[devId];
};

class DrHarvesterInput {
  #timestamp;
  #battery;
  #batteryInit;
  #timePassed;
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
    this.#batteryInit = this.calculateBattery();

    logger.info(
      `device ${id} - ${this.#timestamp.toString()}`
    );
    this.initDate = date;
    this.#timePassed = 0;
  }
  getDate() {
    return new Date(this.#timestamp);
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

    const timePassed =
      currentTime.getTime() - this.#timestamp.getTime();
    this.#timePassed += timePassed;
    this.#timestamp = new Date(currentTime);
    const updatedBattery = this.#battery - timePassed;
    logger.info(
      `${this.devId} - time passed: ${
        timePassed / 1000
      }s, old battery: ${this.batSOC}%`
    );
    this.batSOC =
      (updatedBattery * this.batSOC) / this.#battery;
    this.#battery = updatedBattery;
    const currentIrradiance = this.getIrradiance();
    if (this.phIrr !== currentIrradiance) {
      this.#battery = this.calculateBattery();
    }
    this.phIrr = this.getIrradiance();

    logger.info(`new battery: ${this.batSOC}`);
    if (this.batSOC <= 0) {
      console.log(this.phIrr);
      console.log(this.duty);
      console.log(this.initDate.toString());
      console.log(this.#timePassed);
      console.log(this.#timePassed / 3600000);
      console.log(this.calculateBattery() / 3600000);
      console.log(this.#batteryInit / 3600000);
      process.exit();
    }
  }

  calculateBattery() {
    const misteriousData =
      (-0.424 * this.phIrr + (648 + 5.8 * this.duty)) / 25;

    let batlifeh =
      (3250 * (this.batSOC / 100)) /
      Math.abs(misteriousData);

    if (this.duty == 0) batlifeh *= 1.1;
    batlifeh = batlifeh * 3600000;
    //console.log("lifetime: " + batlifeh);
    return batlifeh;
  }
}

module.exports = generatePayload;
