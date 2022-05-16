const experiment = require("../src/services/startExperiment.service");

const input = {
  url: {
    harvester: "http://127.0.0.1:7739",
    devices: 10,
  },
  lambda: 0.005,
  cacheTime: 1,
};
experiment
  .cacheHistory(input)
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

/* test("test cache stage", () => {
  const input = {
    url: {
      harvester: "http://127.0.0.1:7739",
      devices: 10,
    },
    lambda: 0.005,
    cacheTime: 1,
  };
  const result = experiment.cacheHistory(input);
  expect(result.length).toBeGreaterThan(100);
});
 */
//{ url, lambda, name, cacheTime }
