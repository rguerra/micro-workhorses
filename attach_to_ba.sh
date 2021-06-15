#!/bin/bash

export CONTAINER_NAME=$1
docker container exec -it $CONTAINER_NAME /bin/bash
