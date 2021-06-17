"use strict";

const fs = require('fs');
const readline = require('readline');

var filePath = "./data/video-streaming.jsonl"

let promise =  new Promise(function(resolve, reject) {
    
    var arr = [];
    let rd = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    rd.on('line', function(line){
        console.log(line);
        arr.push(line)
    });

    if(arr.length == 0){
        reject(new Error('Error reading'));
    }else{
        resolve(arr);

    }

});

await promise.resolve();
var result = promise.then(
    (result) => {
        console.log("Inside " + result);
    },
    (error) => {
        console.error(error);
    });

console.log(result);
console.log("TEST ############");
console.log(result.length);

