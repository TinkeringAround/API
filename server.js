const http = require("http");
const app = require("./app");
require("dotenv").config();

const ADDRESS = process.env.HOST_ADDRESS || "localhost";
const PORT = process.env.HOST_PORT || 3000;
const server = http.createServer(app);

server.listen(PORT);
console.log(`Running on http://${ADDRESS}:${PORT}`);
