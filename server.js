const http = require('http');//import package
const port = 3000;
const app = require('./app');

const server = http.createServer(app);
server.listen(port);
