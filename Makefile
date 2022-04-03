SERVICE_NAME=blog

up-dev:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm run dev
install:
	docker-compose run --service-ports --rm $(SERVICE_NAME) npm install