#! /bin/bash

export VIDEO_STORAGE_HOST=spaces-storage
export VIDEO_STORAGE_PORT=3003
export PORT=3000
npm install
#node src/server.js
#npm start
#npx nodemon src/server.js
node src/index.js

