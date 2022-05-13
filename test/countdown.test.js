const countdown = require("../utils/countdown");

const counter = async () => {
  const start = Date.now();
  await countdown(5, () => {
    console.log("test");
  });
  return Date.now() - start;
};

const counterSetTimeout = async () => {
  const start = Date.now();
  await countdown(5, async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("print each second");
        resolve("done!");
      }, 1000);
    });
  });
  return Date.now() - start;
};

test("test Countdown", async () => {
  counter()
    .then((time) => {
      expect(parseInt(time / 1000)).toBe(5);
    })
    .catch(console.error);
});

test("test countdown with setTimeout", async () => {
  counterSetTimeout()
    .then((time) => {
      expect(parseInt(time / 1000)).toBe(5);
    })
    .catch(console.error);
});
