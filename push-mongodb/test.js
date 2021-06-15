"use strict";
//
// Toolkit functions for reading and writing files.
//
const fs = require('fs');
const EJSON = require('mongodb-extjson')
var readline = require('readline');


let lines = [];
var fileName = "data/video-streaming.jsonl"

var fileStream = fs.createReadStream(fileName);

var rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});


rl.on('line', function(line){
    console.log(EJSON.parse(line));
});

//
//reader.on('data', function(chunk){
//    console.log(chunk.toString());
//});

//let rd = readline.createInterface({
//    input: fs.createReadStream(fileName),
//    console: false
//});
//
//rd.on('line', function(line){
//    lines.push(EJSON.parse(line))
//});
//
//console.log(lines.length);
//for(var i=0; i < lines.length; i++){
//    console.log(lines[i]);
//}
//
//
//
