const express = require("express");

const app = express();
if(!process.env.PORT) {
	throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
const PORT = process.env.PORT;

//
// Registers a HTTP GET route.
//
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`First example app listening on port ${PORT}, point your browser at http://localhost:${PORT}`);
});  
