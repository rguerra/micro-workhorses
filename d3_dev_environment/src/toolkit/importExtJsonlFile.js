"use strict";

const file = require('./file.js');
const EJSON = require('mongodb-extjson')

//
// Helper function to import a JSON file.
//
function importJsonlFile (filePath) {
	return file.readJsonLines(filePath)
		.then(lines => {
            var jsonLines = []
            for(let line of lines){
                var jsonLine = EJSON.parse(line)
                jsonLines.push(jsonLine)
            }
			return lines;
		});
};

module.exports = importJsonlFile;
