
#! /bin/bash

docker build -f Dockerfile-k8s -t node-helloworld:v1 .
minikube image load node-helloworld:v1
