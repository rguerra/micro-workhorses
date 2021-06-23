"use strict";

//const mongo = require('promised-mongo');
const mongodb = require("mongodb");


// UNCOMMENT to run locally
//const db = mongo("127.0.0.1:27017/video-streaming", ["videos"]);
//importJsonlFile("data/foobar.jsonl")
//
//const db = mongo("data-mongodb:27017/video-streaming", ["videos"]);

const DBNAME = "video-streaming"
//const DBHOST = "data-mongodb:27017/video-streaming"
const DBHOST="mongodb://127.0.0.1:27017"
console.log("Connection to DB: "+DBNAME);
var db;
const something = mongodb.MongoClient.connect(DBHOST) // Connect to the database.
        .then(client => {
            db = client.db(DBNAME);
            console.log("Collection: videos");
            const videosCollection = db.collection("videos");
            const id = "5d9e690ad76fe06a3d7ae416"
            const videoId = new mongodb.ObjectID(id);
            console.log("video: "+videoId);
            //var some_thing = videosCollection.find()
            //console.log(some_thing)
            videosCollection.findOne({ _id: videoId })
                    .then(videoRecord => {
                        console.log(videoRecord);
                    });
            videosCollection.findOne({ _id: id })
                    .then(videoRecord => {
                        console.log(videoRecord);
                    });
        });
//        videosCollection.find()
//            .then(item => {
//                console.log(">> "+item);
//            })
//        videosCollection.findOne({ _id: videoId })
//            .then(videoRecord => {
//                console.log("videoRecord: "+videoRecord);
//                if (!videoRecord) {
//                    console.log("Returning a 404");
//                    res.sendStatus(404);
//                    return;
//                }
//
//                console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);
//                console.log(VIDEO_STORAGE_HOST+":"+VIDEO_STORAGE_PORT+`/video?path=${videoRecord.videoPath}`);
//
//                const forwardRequest = http.request( // Forward the request to the video storage microservice.
//                    {
//                        host: VIDEO_STORAGE_HOST,
//                        port: VIDEO_STORAGE_PORT,
//                        path:`/video?path=${videoRecord.videoPath}`, // Video path now retrieved from the database.
//                        method: 'GET',
//                        headers: req.headers
//                    }, 
//                    forwardResponse => {
//                        res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
//                        forwardResponse.pipe(res);
//                    }
//                );
//
//                
//                req.pipe(forwardRequest);
//            })
//            .catch(err => {
//                console.error("Database query failed.");
//                console.error(err && err.stack || err);
//                res.sendStatus(500);
//            });

