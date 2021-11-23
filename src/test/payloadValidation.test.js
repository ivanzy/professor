const validate = require("../validations/payloadValidator");

const payload = {
  lambda: 1,
  time: 5,
  name: "testExperiment",
  url: "http://localhost:8888/status",
};

test("testing valid payload", () => {
  expect(validate(payload)).toBeTruthy();
});
const invalidPayload = {
  lambda: 1,
  time: 5,
};
test("testing invalid payload", () => {
  expect(validate(invalidPayload)).toBeFalsy();
});
