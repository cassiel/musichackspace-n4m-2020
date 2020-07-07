// -*- tab-width: 4; -*-

// Server with web socket.

const maxAPI = require("max-api");
const express = require("express");     // Web server
const WebSocket = require("ws");		// Web socket support

let app = express();

// Serve HTML files from the default directory:
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

	maxAPI.addHandler("reload", (msec) => {
		ws.send(JSON.stringify({
			"type" : "reload",
			"msec" : msec
		}))
	})
	
	maxAPI.addHandler("release", (filename, id) => {
		ws.send(JSON.stringify({
			"type" : "audiofile",
			"filename" : filename,
			"id" : id
		}))
	})
});
