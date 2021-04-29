#!/bin/bash

#Define the string value
#text="comma,separated,text"
text=$1
docker_compose_string=""
# Set space as the delimiter
IFS=','

#Read the split words into an array based on space delimiter
read -a strarr <<< "$text"

#Count the total words
echo "There are ${#strarr[*]} words in the text."

# Print each value of the array by using the loop
#docker_compose_string=$(cat <<-END
#version: '3'
#services: 
#END
#)

docker_compose_string='
version: '"'3'"'
services: 
'
for val in "${strarr[@]}";
do
  printf "Processing $val\n"
  file_content=`cat $val/docker-compose.snippet`
  docker_compose_string+='
  '"${file_content}"

done

#echo "$docker_compose_string" >> "docker-compose.yaml"
echo "$docker_compose_string" > "docker-compose.yaml"
