
#! /bin/bash

dir=$(pwd)
docker run -v $dir:/usr/src/app -p 3003:80 --rm -it $1 bash
