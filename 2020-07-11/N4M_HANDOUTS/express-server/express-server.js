// -*- tab-width: 4; -*-

// Server with web socket.

const maxAPI = require("max-api");
const express = require("express");     // Web server
const WebSocket = require("ws");		// Web socket support

let app = express();

// Serve HTML (and other) files from the default directory:
app.use(express.static(__dirname));

const port = 9090;

// Start the web server:
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

// Separately, create and start the socket server:
const wss = new WebSocket.Server({ port: 7474 });

wss.on("connection", (ws, req) => {		//	When the client connects...
	// Messages in from the client:
	ws.on("message", (message) => {
		console.log("received: %s", message);
    });

	// Clean up when client disconnects:
	ws.on("close", () => {
		maxAPI.removeHandlers("send");
		console.log("Connection closed");
		ws.terminate();
	});
	
	// Connect up to Max here: [...]
});
