const express = require("express");
const http = require("http");
const mongodb = require("mongodb");
const amqp = require('amqplib');


//
// Throws an error if the any required environment variables are missing.
//
if (!process.env.RABBIT) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

//
// Extracts environment variables to globals for convenience.
//

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const RABBIT = process.env.RABBIT;

//
// Connect to the RabbitMQ server.
//
function connectRabbit() {

    console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);

    return amqp.connect(RABBIT) // Connect to the RabbitMQ server.
        .then(connection => {
            console.log("Connected to RabbitMQ.");

            return connection.createChannel(); // Create a RabbitMQ messaging channel.
        });
}

//
// Send the "viewed" to the history microservice.
//
function sendViewedMessage(messageChannel, videoPath) {
    console.log(`Publishing message on "viewed" queue.`);

    const msg = { videoPath: videoPath };
    const jsonMsg = JSON.stringify(msg);
    messageChannel.publish("", "viewed", Buffer.from(jsonMsg)); // Publish message to the "viewed" queue.
}


function connectMongoDB() {
    console.log("Connection to DB: "+DBNAME);
    return mongodb.MongoClient.connect(DBHOST) // Connect to the database.

}
//
// Application entry point.
//
function main() {
    return Promise.all([connectMongoDB(), connectRabbit()])
        .then((values) =>{
            var client = values[0]
            var messageChannel = values[1]
            
            return startHttpServer(messageChannel, client);

        });
}
//
// Start the HTTP server.
//
function startHttpServer(messageChannel, client) {
    return new Promise(resolve => { // Wrap in a promise so we can be notified when the server has started.
        const app = express();
        const db = client.db(DBNAME);
        console.log("Collection: videos");
        const videosCollection = db.collection("videos");
        setupHandlers(app, messageChannel, videosCollection);

        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            resolve(); // HTTP server is listening, resolve the promise.
        });
    });
}

console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

function setupHandlers(app, messageChannel, videosCollection ) {
        
            app.get("/video", (req, res) => {
                console.log("HTTP Request to /video");
                console.log("param: "+req.query.id);
                //const videoId = new mongodb.ObjectID(req.query.id);
                const videoId = req.query.id;
                console.log("video: "+videoId);
                console.log("findOne({_id:"+videoId+"})");
                videosCollection.findOne({ _id: videoId })
                    .then(videoRecord => {
                        console.log("videoRecord: "+videoRecord);
                        if (!videoRecord) {
                            console.log("Returning a 404");
                            res.sendStatus(404);
                            return;
                        }

                        console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);
                        console.log(VIDEO_STORAGE_HOST+":"+VIDEO_STORAGE_PORT+`/video?path=${videoRecord.videoPath}`);
        
                        const forwardRequest = http.request( // Forward the request to the video storage microservice.
                            {
                                host: VIDEO_STORAGE_HOST,
                                port: VIDEO_STORAGE_PORT,
                                path:`/video?path=${videoRecord.videoPath}`, // Video path now retrieved from the database.
                                method: 'GET',
                                headers: req.headers
                            }, 
                            forwardResponse => {
                                res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                                forwardResponse.pipe(res);
                            }
                        );

                        
                        req.pipe(forwardRequest);
                        sendViewedMessage(messageChannel, `${videoRecord.videoPath}`); // Send message to "history" microservice that this video has been "viewed".
                    })
                    .catch(err => {
                        console.error("Database query failed.");
                        console.error(err && err.stack || err);
                        res.sendStatus(500);
                    });
            });

}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });
