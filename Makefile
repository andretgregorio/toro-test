.PHONY: start
start:
	USER=$(id -u) docker compose up -d
