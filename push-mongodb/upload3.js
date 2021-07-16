"use strict";
const importCsvFile = require('./toolkit/importCsvFile.js');
const mongo = require('promised-mongo');


const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);
importCsvFile("data/d3_data.csv")
    .then(lines =>  db["timeseries"].insert(lines))
    .then(async () => await db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });

