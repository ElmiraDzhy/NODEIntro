const http = require("http");
const fs = require("fs/promises");

const server = http.createServer(requestListener);
server.listen(3000);

function requestListener(req, res) {
	if (req.method === "GET") {
		if (req.url === "/home") {
			fs.readFile("./views/index.html", "utf-8").then((data) => {
				res.statusCode = 200;
				res.end(data);
			});
		} else if (req.url === "/styles.css") {
			fs.readFile("./views/styles.css").then((data) => {
				res.statusCode = 200;
				res.end(data);
			});
		} else {
			fs.readFile("./views/404.html").then((data) => {
				res.statusCode = 404;
				res.end(data);
			});
		}
	} else if (req.method === "POST") {
		if ((req.url = "/users")) {
			// get data is an async format via ReadbleStream
			// when data is coming  - event "data" of req
			// when all data is came - event "end" of req
			// data is coming by chunks - Buffer

			let stringFromChunk = "";

			//how we can put event listener on req?
			// class EventEmmiter
			//emmiter.on()
			//emmiter.emit()

			req.on("data", (chunk) => {
				stringFromChunk += chunk;
			});

			req.on("end", async () => {
				const userData = JSON.parse(stringFromChunk);
				try {
					await writeUserToFile(userData);
					res.statusCode = 201;
					res.end("user successfully created");
				} catch (error) {
					res.statusCode = 400;
					res.end("oops");
				}
			});
		}
	}
}

async function writeUserToFile(userData) {
	return fs.appendFile("./data/userData.txt", JSON.stringify(userData), "utf-8");
}

