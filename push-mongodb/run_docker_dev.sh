
#! /bin/bash

dir=$(pwd)
docker run -v $dir:/usr/src/app -p 5000:80 --rm -it $1 bash
