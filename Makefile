services-run:
	docker compose up -d --build

services-clean:
	docker ps --filter name=fuels-ts* -aq | xargs docker stop | xargs docker rm -f
	docker volume ls --filter name=fuels-ts* -q | xargs docker volume rm
	docker image ls --filter "reference=fuels-ts*" -q | xargs docker rmi
