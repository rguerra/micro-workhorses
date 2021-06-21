"use strict";
const importJsonlFile = require('./toolkit/importJsonlFile.js');
const importExtJsonlFile = require('./toolkit/importExtJsonlFile.js');
const mongo = require('promised-mongo');


const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);
//importJsonlFile("data/foobar.jsonl")
importJsonlFile("data/video-streaming.jsonl")
//importExtJsonlFile("data/video-streaming.jsonl")
    .then(lines =>  db["videos"].insert(lines))
    .then(async () => await db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });

