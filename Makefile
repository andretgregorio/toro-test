.PHONY: start
start:
	USER=$(id -u) docker compose up -d

.PHONY: stop
stop:
	docker compose stop
