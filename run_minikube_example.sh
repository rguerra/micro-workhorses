
#!/bin/bash
#kubectl apply -f [MICROSERVICE DIR]/deployment.yml -f [MICROSERVICE]/service.yml
kubectl apply -f $1/deployment.yml -f $1/service.yml

# Wait for pods to be up and then por-forward
#kubectl port-forward service/node-helloworld-service 3000:3000 --address=0.0.0.0
