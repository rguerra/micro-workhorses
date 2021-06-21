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
           // lines.push(EJSON.parse(line))
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


//
// Helper function to import a JSON file.
//
function importJsonlFile (filePath) {
	//return file.readJsonLines(filePath)
	return readJsonLines(filePath)
		.then(lines => {
			return lines;
		});
};

//const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);
const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);

//await importJsonlFile("./data/video-streaming.jsonl")
importJsonlFile("./data/foobar.jsonl")
    .then(lines => {
        console.log(lines)
        //db["videos"].insert(lines)
        var nested_promise = db["videos"].insert(lines);
        nested_promise.then( () => {
            console.log('Done');
        }).catch(({message}) => console.error(message))
    })
    //.then(() => db.close())
    .catch(err => {
        console.error("An error occurred.");
        console.error(err.stack);
    });

