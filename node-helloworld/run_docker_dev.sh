
#! /bin/bash

dir=$(pwd)
docker run -v $dir/src:/usr/src/app/src -p 4002:80 --rm -it $1 bash
