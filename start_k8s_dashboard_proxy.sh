#!/bin/bash

# Make sure you have started the Dashboard somewhere
# minikube dashboard --url

kubectl proxy --address=0.0.0.0 --accept-hosts='.*'
