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
	// #1: messages in from the client (web page):
	ws.on("message", (message) => {
		console.log("received: %s", message);		// Not message.data.
		maxAPI.outlet(message);
    });

	// Clean up when client disconnects:
	ws.on("close", () => {
		console.log("Connection closed");
		maxAPI.removeHandlers("colour");
		maxAPI.removeHandlers("reload");
		maxAPI.removeHandlers("release");
		ws.terminate();
	});
	
	// #2: colour message from Max can be sent through to web page.
	// (Note: "colour" will be ignored until we get a client connection.)
	maxAPI.addHandler("colour", (...args) => {
		console.log("colour args: " + args);
		if (args.length === 3) {
	            ws.send(JSON.stringify({
					"type" : "colour",		// Add this once we need to distinguish message types.
	                "R" : args[0],
			        "G" : args[1],
					"B" : args[2]
		    }));
		}
	});

	// Not sure this one is practical.
	maxAPI.addHandler("reload", (msec) => {
		ws.send(JSON.stringify({
			"type" : "reload",
			"msec" : msec
		}))
	})
	
	// #4: release an audio file to the web.
	maxAPI.addHandler("release", (filename) => {
		ws.send(JSON.stringify({
			"type" : "audiofile",
			"filename" : filename
		}))
	})
});
