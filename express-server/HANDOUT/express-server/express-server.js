// -*- tab-width: 4; -*-

// Server with web socket.

const maxAPI = require("max-api");
const express = require("express");     // Web server
const WebSocket = require("ws");		// Web socket support

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
});
