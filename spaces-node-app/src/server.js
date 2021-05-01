// Load dependencies
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

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'cli-storage/storage',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

// Views in public directory
app.use(express.static('public'));

// Main, error and success views
app.get('/', function (request, response) {
  //response.sendFile(__dirname + '/../public/index.html');
  response.sendFile(path.resolve("public/index.html"));
});

app.get("/success", function (request, response) {
 //response.sendFile(__dirname + '/../public/success.html');
  response.sendFile(path.resolve("public/success.html"));
});

app.get("/error", function (request, response) {
  //response.sendFile(__dirname + '/../public/error.html');
  response.sendFile(path.resolve("public/error.html"));
});

app.post('/upload', function (request, response, next) {
  upload(request, response, function (error) {
    if (error) {
      console.log(error);
      return response.redirect("/error");
    }
    console.log('File uploaded successfully.');
    response.redirect("/success");
  });
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice listening on port ${PORT}`);
});
