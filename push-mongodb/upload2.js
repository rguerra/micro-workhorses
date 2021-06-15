"use strict";

const importJsonFile = require('./toolkit/importJsonFile.js');
const exportToMongoDB = require('./toolkit/exportToMongoDB.js');
const mongo = require('promised-mongo');

const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);

importJsonFile("./data/video-streaming.json")
    .then(data => exportToMongoDB(db, "videos", data))
    .then(() => db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });

