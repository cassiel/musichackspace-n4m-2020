// Server with web socket.

const maxAPI = require("max-api");
const express = require("express");     // Web server
const WebSocket = require("ws");

let app = express();

app.use(express.static('public'));

const port = 9090;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

const wss = new WebSocket.Server({ port: 7474 });

wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
	console.log("received: %s", message);
    });

    ws.on("close", () => {
	maxAPI.removeHandlers("send");
	console.log("Connection closed");
	ws.terminate();
    });

    maxAPI.addHandler("send", (...args) => {
	console.log("send args: " + args);
	if (args.length === 3) {
            ws.send(JSON.stringify({
	        "R": args[0],
	        "G": args[1],
	        "B": args[2]
	    }));
	}
    });
});
