// Server with web socket.

const maxAPI = require("max-api");
const express = require("express");     // Web server
const WebSocket = require("ws");

let app = express();

/*
app.get("/", (req, res) => {
    res.send("Hello Max World!");
});
*/

app.use(express.static('public'));

const port = 9090;

app.listen(port, function listening() {
    console.log(`Listening on ${port}`);
});

const wss = new WebSocket.Server({ port: 7474 });

wss.on("connection", function connection(ws, req) {
    ws.on("message", function incoming(message) {
	console.log("received: %s", message);
    });

    ws.on("close", function stop() {
	Max.removeHandlers("send");
	console.log("Connection closed");

	ws.terminate();
    });

    maxAPI.addHandler("send", (...args) => {
	console.log("send args: " + args);
	if (args.length === 3) {
            ws.send(JSON.stringify({
	        "value_1": args[0],
	        "value_2": args[1],
	        "value_3": args[2]
	    }));
	}
    });
});
