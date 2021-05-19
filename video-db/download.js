"use strict";

const mongo = require('promised-mongo');
const importFromMongoDB = require('./toolkit/importFromMongoDB.js');

const db = mongo("data-mongodb:27017/earthquakes", ["largest_earthquakes"]);

importFromMongoDB(db, "largest_earthquakes")
    .then(data => {
        console.log(data);
    })
    .then(() => db.close())
    .catch(err => {
        console.error(err);
    });
