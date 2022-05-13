const performCall =
  require("../controllers/start.controller").performCall;

test("testing perform call function", () => {
  const payload = {
    lambda: 0.1,
    time: 300,
    url: "http://localhost:8888/status",
  };
  performCall(payload)();
});
