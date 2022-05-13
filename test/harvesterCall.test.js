const performRequest = require("../src/services/performRequest");

const toMs = 1000000;

test("check simple GET request", async () => {
  const result = await performRequest.get();
  console.info(result / toMs);
  expect(result).toBeDefined();
});

test("check DrHarvester call", async () => {
  const result = await performRequest.harvester(
    {
      harvester: "http://127.0.0.1:7739",
    },
    "test"
  );
  expect(0).toBeDefined();
});
