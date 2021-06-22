"use strict";
//const importJsonlFile = require('./toolkit/importJsonlFile.js');
const mongo = require('promised-mongo');
//const file = require('./toolkit/file.js');
const fs = require('fs');
const readline = require('readline');
const EJSON = require('mongodb-extjson')

//
// Read a text file line by line form the file system.
// This method is very innefficient a better way would be to read line by line from file and not to load all of the lines into memory.
//
function readJsonLines (fileName) {
    let lines = [];
    let rd = readline.createInterface({
        input: fs.createReadStream(fileName),
        crlfDelay: Infinity
    });
    return new Promise((resolve, reject) => {
        rd.on('line', function(line){
           //lines.push(EJSON.parse(line))
           lines.push(JSON.parse(line))
        });
        rd.on('close', function(){
            resolve(lines);
        });
        rd.on('error', function(err){
            reject(err);
        });
    });
};

// UNCOMMENT to run locally
//const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);

const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);
readJsonLines("data/foobar.jsonl")
    .then(lines =>  db["videos"].insert(lines))
    //.then(lines => {
    //    const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);
    //    console.log(lines);
    //    db["videos"].insert(lines);
    //    db.close();
    //})
    .then(async () => await db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });

