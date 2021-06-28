
#! /bin/bash

dir=$(pwd)
#docker run -v $dir:/usr/src/app -p 27017:27017 --rm -it $1 bash
docker run -v $dir:/usr/src/app --rm -it $1 bash
