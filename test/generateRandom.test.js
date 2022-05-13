const generateRandom = require('../generateRandomNumber');


test('check random number generation - ZERO NOT ALLOWED', () => {
    for (let i = 0; i < 10000; i++) {
        const randomTrial = {
            endpoint: generateRandom.endpoints(),
            method: generateRandom.methods(),
            getAndPost: generateRandom.getAndPost()
        };
        //console.log(randomTrial);
        expect(randomTrial.endpoint).not.toBe(0);
        expect(randomTrial.method).not.toBe(0);
        expect(randomTrial.getAndPost).not.toBe(0);
    }
});
