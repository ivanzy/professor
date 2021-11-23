const experimentControl = require('../utils/experimentControl');

test('isExperiment running should be false', () => {
    expect(experimentControl.isExperimentRunning()).toBeFalsy();
})