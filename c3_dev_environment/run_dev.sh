#! /bin/bash

export PORT=4002
npm install 
cd public/
bower install
cd ..
npm run start:dev
