
#! /bin/bash

dir=$(pwd)
docker run -v $dir/src:/usr/src/app/src -p 3003:80 --rm -it $1 bash
