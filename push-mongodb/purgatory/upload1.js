"use strict";

const fs = require('fs');
const readline = require('readline');

var filePath = "data/video-streaming.jsonl"


let promise =  new Promise(function(resolve, reject) {
    
    var text = fs.readFileSync(filePath).toString('utf-8');
    resolve(text.split("\n"));
    //var textByLine = text.split("\n");
    //if(textByLine.length == 0){
    //    reject(new Error('Error because arr is 0'));
    //}else{
    //    console.log("END >>>"+arr);
    //    resolve(textByLine);
    //}

});


// ASYNC
promise.then(
    (result) => {
        console.log( result );
        return result
    },
    (error) => {
        console.error(error);
    });

// SYNC
//( async() => {
//    const meta = await promise;
//    console.log( meta );
//})();


