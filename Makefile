start: 
	make up
	make dev

up:
	docker-compose up --build

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

down:
	docker-compose down