"use strict";

const importJsonlFile = require('./toolkit/importJsonlFile.js');
const mongo = require('promised-mongo');

//const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);
const db = mongo("127.0.0.1:30000/video-streaming", ["videos"]);

//importJsonlFile("./data/video-streaming.jsonl")
importJsonlFile("./data/foobar.jsonl")
    .then(lines => {
        for(var i=0; i < lines.length; i++){
            console.log(lines[i]);
            db["videos"].insert(lines[i]);
        }
    })
    .then(() => db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });
