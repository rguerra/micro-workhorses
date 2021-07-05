

# micro-workhorses


## STANDUP ALL MICROSERVICE
```
./up-dev.sh data-mongodb,rabbit,history,video-streaming,spaces-storage,push-mongodb
```

## Create a docker-compose.yml file 
Create a *docker-compose.yml* using the script **_create_docker_compose.sh_** and pass the directories as parameters in a comma separated string and that each directory has a docker-compose.snippet file like:
	* node-helloworld/docker-compose.snippet
	* spaces-node-app/docker-compose.snippet

```
./create_docker_compose.sh node-helloworld,video-streaming
```
