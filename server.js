const http = require('http');
const app = require('./app');

const PORT = 3000;
const HOST = "localhost";
const server = http.createServer(app);

server.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);