// Load dependencies

const importCsvFile = require('./toolkit/importCsvFile.js');
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');

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



// Views in public directory
app.use(express.static('public'));

// Main, error and success views
app.get('/', function (request, response) {
  //response.sendFile(__dirname + '/../public/index.html');
  response.sendFile(path.resolve("public/index.html"));
});


//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}`);
});
