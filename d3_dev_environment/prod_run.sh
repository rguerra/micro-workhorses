#!/usr/bin/bash

export PORT=3003
# Installs only dependencies that are required in production.
npm install --only=production

npm start
