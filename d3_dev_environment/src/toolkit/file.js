"use strict";

//
// Toolkit functions for reading and writing files.
//

const fs = require('fs');
const readline = require('readline');
//const EJSON = require('mongodb-extjson')

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
           //lines.push(JSON.parse(line))
            // TODO: Instead of pushing lines to a list can we stream them?
            lines.push(line)
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
// Read a text file form the file system.
//
function read (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8",
            (err, textFileData) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

//
// Write a text file to the file system.
//
function write (fileName, textFileData) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, textFileData,
			(err) => {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			}
		);
	});
};

module.exports = {
	read: read,
	write: write,
    readJsonLines: readJsonLines,
};
