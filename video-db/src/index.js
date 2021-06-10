
"use strict";

const importCsvFile = require('./toolkit/importCsvFile.js');
const exportToMongoDB = require('./toolkit/exportToMongoDB.js');
const mongo = require('promised-mongo');

const db = mongo("data-mongodb:27017/earthquakes", ["largest_earthquakes_export"]);

importCsvFile("./data/earthquakes.csv")
    .then(data => exportToMongoDB(db, "largest_earthquakes_export", data))
    .then(() => db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });



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
