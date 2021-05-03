
// Load dependencies
const aws = require('aws-sdk');
const express = require('express');

const spacesEndpoint =
//const azure = require('azure-storage');

const app = express();

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});
var downloader = require('s3-download')(s3client);

//
// Throws an error if the any required environment variables are missing.
//

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts environment variables to globals for convenience.
//

const PORT = process.env.PORT;

console.log(`Serving videos from Spaces`);

//
// Create the Blob service API to communicate with Azure storage.
//
//function createBlobService() {
//
//  REF. blobService https://azure.github.io/azure-storage-node/BlobService.html
//
//    const blobService = azure.createBlobService(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
//    // Uncomment next line for extra debug logging.
//    //blobService.logger.level = azure.Logger.LogLevels.DEBUG; 
//    return blobService;
//}

function createBlobService() {
	// TODO: Implement blobService with the aws library.
	//
	// REF. https://www.npmjs.com/package/s3-download
	var params = {
	    Bucket:"cli-storage/storage",   
	    Key:"SampleVideo_1280x720_1mb.mp4"
	}
	var sessionParams = {
		    maxPartSize: ,//default 20MB
		    concurrentStreams: ,//default 5
		    maxRetries: ,//default 3
		    totalObjectSize: //required size of object being downloaded
		}

}
//
// Registers a HTTP GET route to retrieve videos from storage.
//
app.get("/video", (req, res) => {

    const videoPath = req.query.path;
    console.log(`Streaming video from path ${videoPath}.`);
    
    const blobService = createBlobService();

    const containerName = "videos";
    blobService.getBlobProperties(containerName, videoPath, (err, properties) => { // Sends a HTTP HEAD request to retreive video size.
        if (err) {
            console.error(`Error occurred getting properties for video ${containerName}/${videoPath}.`);
            console.error(err && err.stack || err);
            res.sendStatus(500);
            return;
        }

        //
        // Writes HTTP headers to the response.
        //
        res.writeHead(200, {
            "Content-Length": properties.contentLength,
            "Content-Type": "video/mp4",
        });

        //
        // Streams the video from Azure storage to the response.
        //
        blobService.getBlobToStream(containerName, videoPath, res, err => {
            if (err) {
                console.error(`Error occurred getting video ${containerName}/${videoPath} to stream.`);
                console.error(err && err.stack || err);
                res.sendStatus(500);
                return;
            }
        });
    });
});

//
// Starts the HTTP server.
//
app.listen(PORT, () => {
    console.log(`Microservice online`);
});
