const random = require("../src/utils/randomGenerator");

test("test exponential distribution", async () => {
  const result = random.exponentialGenerator(1, 0.5);
  //console.info(result);
  expect(result).toBeDefined();
});

test("test random date", async () => {
  const startDate = new Date(2020, 0, 1);
  const endDate = new Date(2020, 11, 30);
  const randomDate = random.randomDate(startDate, endDate);

  expect(randomDate.getTime()).toBeGreaterThanOrEqual(
    startDate.getTime()
  );

  expect(randomDate.getTime()).toBeLessThanOrEqual(
    endDate.getTime()
  );
});
