"use strict";

const assert = require('assert');
const fs = require('fs');
const readline = require('readline');
const file = require('./toolkit/file.js');
var MongoClient = require('mongodb').MongoClient;
const EJSON = require('mongodb-extjson')

var filePath = "./data/video-streaming.jsonl"
var dbName = "video-streaming";

const client = new MongoClient("mongodb://127.0.0.1:27017")

let rd = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
});

var lines = [];
console.log(lines);
var lines = rd.on('line', function(line){
    console.log(line);
    lines.push(line)
    return lines;
});
console.log(lines);
console.log("TEST ############");
console.log(lines.length);

//client.connect(function(err){
//    assert.equal(null, err);
//    console.log('Connected succssfully to server');
//    const db = client.db(dbName);
//    const collection = db.collection('videos')
//    for(var i=0; i < lines.length; i++){
//        console.log(lines[i]);
//        collection.insert(lines[i]);
//    }
//    client.close();
//});


