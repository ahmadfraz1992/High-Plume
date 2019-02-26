const http = require("http");
const app = require("./app");
const port = process.env.PORT || 6005;
const server = http.createServer(app);
server.on("listening", function() {
  console.log("ok, server is running");
});
server.listen(port);
