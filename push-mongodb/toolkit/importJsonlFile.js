"use strict";

const file = require('./file.js');

//
// Helper function to import a JSON file.
//
function importJsonlFile (filePath) {
	return file.readJsonLines(filePath)
		.then(lines => {
			return lines;
		});
};

module.exports = importJsonlFile;
