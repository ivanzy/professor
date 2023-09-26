const { exec } = require("child_process");
const http = require("http");

// Command to start your service (e.g., npm run start)
const startCommand = "npm run start";
const waitingTime = 10;

// Function to start the service
const startService = (url, timeInSeconds, numberOfEdges, withFeatures) => {
  console.log(
    `Starting the service with numberOfEdges: ${numberOfEdges}, withFeatures: ${withFeatures}...`
  );
  const childProcess = exec(startCommand);

  // Log child process output
  childProcess.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  childProcess.stderr.on("data", (data) => {
    console.error(`Child Process Error: ${data}`);
  });

  const endpointSuffix = withFeatures ? "Features" : "RawExtract";

  setTimeout(() => {
    console.log("Making an HTTP POST request...");
    const requestBody = {
      "number-of-edges": numberOfEdges,
      time: timeInSeconds,
      name: `auto-${timeInSeconds}-${numberOfEdges}-${endpointSuffix}`,
      replication: 1,
      accelerometer: {
        withFeatures: withFeatures,
        url: `${url}/acceleration${endpointSuffix}`,
        perEdgeNode: 3,
        samples: 2500,
        features: 6,
        periodicity: 3600000,
      },
      "acoustic-emission": {
        withFeatures: withFeatures,
        url: `${url}/acoustic${endpointSuffix}`,
        perEdgeNode: 3,
        features: 11,
        samples: 2500,
        periodicity: 60000,
      },
    };

    const requestOptions = {
      hostname: "localhost",
      port: 3000,
      path: "/start",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = http.request(requestOptions, (res) => {
      // Handle the HTTP response if needed
      console.log(`HTTP Response: ${res.statusCode}`);
    });

    req.on("error", (error) => {
      console.error(`HTTP Request Error: ${error.message}`);
    });

    req.write(JSON.stringify(requestBody));
    req.end();
  }, 5000); // You can adjust the delay here if needed

  // Stop the service after the specified time
  setTimeout(() => {
    if (childProcess) {
      console.log(
        "*************************************************************************************************"
      );
      console.log("Stopping the service...");
      console.log(
        "*************************************************************************************************"
      );
      exec("npm run stop")
    }
  }, (timeInSeconds + waitingTime) * 1000);
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const runWithDifferentParameters = async (url, timeInSeconds, numberOfEdges, maxEdges) => {
  while (numberOfEdges <= maxEdges) {
    // Run withFeatures true
    startService(url, timeInSeconds, numberOfEdges, false);
    await delay((timeInSeconds + waitingTime + 10) * 1000);
    startService(url, timeInSeconds, numberOfEdges, true);
    await delay((timeInSeconds +  waitingTime + 10) * 1000);
    numberOfEdges *= 2;
  }
};
// Example usage:
const url = "http://dld.arces.unibo.it:3000";
const timeInSeconds = 600;
const startingNumberOfEdges = 30;
const maxEdges = 480;

//600
//400
//200


runWithDifferentParameters(url, timeInSeconds, startingNumberOfEdges, maxEdges);
//startService(url, 5, 10, false);
