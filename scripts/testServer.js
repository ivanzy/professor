const http = require("http");

const server = http.createServer((req, res) => {
  const contentLength = req.get("Content-Length");
  console.log(contentLength);
  if (req.url === "/calc" && req.method === "POST") {
    let contentLength = 0;

    // Listen for the 'data' event to calculate the content length
    req.on("data", (chunk) => {
      contentLength += chunk.length;
    });

    // Listen for the 'end' event to send the response with the content length
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Content-Length: ${contentLength}`);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
