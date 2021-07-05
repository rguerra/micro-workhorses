
#!/bin/bash

export MICROSERVICES_FOLDERS_CSV=$1

echo "$MICROSERVICES_FOLDERS_CSV"
./create_docker_compose_dev.sh "$MICROSERVICES_FOLDERS_CSV"; ./run.sh 
