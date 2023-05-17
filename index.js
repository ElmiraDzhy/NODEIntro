const http = require("http");
const requestListener = require("./requestListener");

const server = http.createServer(requestListener);
server.listen(3000);

