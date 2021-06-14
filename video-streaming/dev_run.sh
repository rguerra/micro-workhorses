#! /bin/bash

export VIDEO_STORAGE_HOST=spaces-storage
export VIDEO_STORAGE_PORT=4000
export PORT=4001
npm install
#node src/server.js
#npm start
#npx nodemon src/server.js
npm run start:dev

