
#!/bin/bash

export MICROSERVICES_FOLDERS_CSV=$1

echo "$MICROSERVICES_FOLDERS_CSV"
./create_docker_compose_prod.sh "$MICROSERVICES_FOLDERS_CSV"; ./run.sh 
