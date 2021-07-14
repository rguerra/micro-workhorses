#! /bin/bash

docker build -t  airflow -f Dockerfile-dev . --progress=plain
