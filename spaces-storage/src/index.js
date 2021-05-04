
// Load dependencies
const aws = require('aws-sdk')
const express = require('express')

const app = express()

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com')
const s3 = new aws.S3({
  endpoint: spacesEndpoint
})

//
// Throws an error if the any required environment variables are missing.
//

if (!process.env.PORT) {
  throw new Error('Please specify the port number for the HTTP server with the environment variable PORT.')
}

//
// Extracts environment variables to globals for convenience.
//

const PORT = process.env.PORT

console.log('Serving videos from Spaces')

app.get('/video', (req, res) => {
  if(!req.query.path){
	res.status(500).send('No filepath')
  }else{

	  const videoPath = req.query.path
	  const containerName = 'cli-storage'
	  // TODO: use videoPath and not the video name hardcoded.
	  console.log(`Streaming video from path ${videoPath}.`)
	  const params = {
	    Bucket: `${containerName}/storage`,
	    Key: `${videoPath}`
	    //Key: 'SampleVideo_1280x720_1mb.mp4'
	  }
	  const readStream = s3.getObject(params).createReadStream()
	  // When the stream is done bien read, end the response
	  readStream.on('close', () => {
	    res.end()
	  })
	  //
	  // Writes HTTP headers to the response.
	  //
	  // res.writeHead(200, {
	  //    "Content-Length": properties.contentLength,
	  //    "Content-Type": "video/mp4",
	  // });
	  readStream.pipe(res)
  }
})



app.get("/", (req, res) => {
    res.send("Not IMPLEMENTED!");
});
app.get('/data', (req, res) => {
  const dataPath = req.query.path
  const containerName = 'cli-storage'
  console.log(`Streaming data from path ${dataPath}.`)
  const params = {
	    Bucket: `${containerName}/data`,
	    Key: `${dataPath}`
  }
  const readStream = s3.getObject(params).createReadStream()
  // When the stream is done bien read, end the response
  readStream.on('close', () => {
    res.end()
  })
  readStream.pipe(res)
})
//
// Starts the HTTP server.
//
app.listen(PORT, () => {
  console.log('Microservice online')
})
