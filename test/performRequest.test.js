const performRequest = require("../service/performRequest");

const toMs = 1000000;

test("check simple GET request", async () => {
  const result = await performRequest.get();
  console.info(result / toMs);
  expect(result).toBeDefined();
});

test("check simple POST request", async () => {
  const result = await performRequest.post();
  console.info(result / toMs);
  expect(result).toBeDefined();
});

test("check simple PUT request", async () => {
  const result = await performRequest.put();
  console.info(result / toMs);
  expect(result).toBeDefined();
});

test("check simple DELETE request", async () => {
  const result = await performRequest.delete();
  console.info(result / toMs);
  expect(result).toBeDefined();
});
