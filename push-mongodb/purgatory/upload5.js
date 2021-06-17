"use strict";

const fs = require('fs');
const readline = require('readline');

var filePath = "./data/video-streaming.jsonl"

let promise =  new Promise(function(resolve, reject) {
    
    var arr = ["a"];
    console.log("START >> " + arr);
    let rd = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity
    });
    rd.on('line', function(line){
        console.log("LINE: " + line);
        arr.push(line)
    });

    resolve(arr);
    //if(arr.length == 0){
    //    reject(new Error('Error because arr is 0'));
    //}else{
    //    console.log("END >>>"+arr);
    //    resolve(arr);
    //}

});

var res = promise.then(
    (result) => {
        console.log("Inside |" + result + "|");
        return result
    },
    (error) => {
        console.error(error);
    });

//console.log("result: |" + res + "|");
//console.log("TEST ############");
//console.log(result.length);

//( async() => {
//    const meta = await promise;
//    console.log("META: |" + meta + "|");
//})();


