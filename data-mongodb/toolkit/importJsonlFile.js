"use strict";

const file = require('./file.js');

//
// Helper function to import a JSON file.
//
function importJsonlFile (filePath) {
	return file.readJsonLines(filePath)
		.then(lines => {
            var jsonLines = []
            for(let line of lines){
                jsonLines.push(JSON.parse(line))
            }
			return jsonLines;
		});
};

module.exports = importJsonlFile;
