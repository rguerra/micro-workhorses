
#!/bin/bash

export MICROSERVICES_FOLDERS_CSV=$1

echo "$MICROSERVICES_FOLDERS_CSV"
./create_docker_compose.sh "$MICROSERVICES_FOLDERS_CSV"; sudo docker-compose up --build --detach
