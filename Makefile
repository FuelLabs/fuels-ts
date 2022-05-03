services-run:
	docker compose up -d

services-clean:
	docker ps --filter name=fuels-ts* -aq | xargs docker stop | xargs docker rm -f
	docker volume ls --filter name=fuels-ts* -q | xargs docker volume rm
