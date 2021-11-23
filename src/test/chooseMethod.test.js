const chooseMethod = require("../utils/chooseMethod");

test("choose method exhaustive test", () => {
  for (let i = 0; i < 100000; i++) {
    let method = chooseMethod();
    methods[method]++;
    expect(method).toMatch(/(get)|(post)|(put)|(delete)|(patch)/);
  }
  console.log(methods);
});

test("testing distribution", () => {
  expect(methods.get).toBeGreaterThan(methods.post);
  expect(methods.post).toBeGreaterThan(methods.delete);
  expect(methods.delete).toBeGreaterThan(methods.put);
  expect(methods.put).toBeGreaterThan(methods.patch);
});
const methods = {
  get: 0,
  post: 0,
  delete: 0,
  put: 0,
  patch: 0,
};
