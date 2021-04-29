// Load dependencies
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');

const app = express();

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'microhorses-spaces.nyc3.digitaloceanspaces.com',
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

app.listen(3001, function () {
  console.log('Server listening on port 3001.');
});
