.PHONY: start
start:
	USER=$(id -u) docker compose up -d

.PHONY: stop
stop:
	docker compose stop

.PHONY: db-migrate
db-migrate:
	docker cp  ./scripts/database/01_create_auth_database.sql  toro_postgres:/tmp
	docker exec  toro_postgres psql -U postgres -f /tmp/01_create_auth_database.sql
