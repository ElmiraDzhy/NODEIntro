const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(requestListener);
server.listen(3000);

function requestListener(req, res) {
	if (req.url === "/home") {
		fs.readFile("./views/index.html", "utf-8").then((data) => {
			res.end(data);
		});
	}
	if (req.url === "/styles.css") {
		fs.readFile("./views/styles.css").then((data) => {
			res.end(data);
		});
	}
}

