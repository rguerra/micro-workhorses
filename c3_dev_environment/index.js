"use strict";

const express = require('express');
const path = require('path');
const importCsvFile = require('./toolkit/importCsvFile.js');

const app = express();
//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;


const staticFilesPath = path.join(__dirname, "public"); // Make our 'public' sub-directory accessible via HTTP.
const staticFilesMiddleWare = express.static(staticFilesPath);
app.use("/", staticFilesMiddleWare);

app.get("/rest/data", (request, response) => { // Set up a HTTP GET request handler that can serve data to our web app.

    importCsvFile("./data/data.csv") // Load the CSV file from the server's file system.
        .then(data => {
            response.json(data); // Send the content of the CSV file (as JSON) to the web app.
        })
        .catch(err => {
            console.error(err);

            response.sendStatus(500); // Let the web app know that an error has occurred.
        });
});

app.listen(PORT, () => { // Start our web server!
    console.log(`Web server listening on port ${PORT}!`);
});
