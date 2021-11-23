const exponentialGenerator = require("../utils/randomGenerator");


test("test exponential distribution", async () => {
  const result =  exponentialGenerator(1,0.5);
  console.info(result );
  expect(result).toBeDefined();
});
