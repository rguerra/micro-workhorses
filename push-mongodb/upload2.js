"use strict";
const importJsonlFile = require('./toolkit/importJsonlFile.js');
const mongo = require('promised-mongo');

const file = require('./toolkit/file.js');


//const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);
const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);



const foobar = async () => {
    //await importJsonlFile("./data/video-streaming.jsonl")
    await importJsonlFile("./data/foobar.jsonl")
        .then(lines => {
            console.log(lines)
            db["videos"].insert(lines)
        })
        //.then(() => db.close())
        .catch(err => {
            console.error("An error occurred.");
            console.error(err.stack);
        });
    process.exit(0);
}

foobar()
