.PHONY: setup
setup:
	USER=$(id -u) docker compose up -d postgres

	make db-migrate

	make stop

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

.PHONY: test-backend
test-backend:
	docker exec toro_backend npm run test -- --coverage

.PHONY: test-frontend
test-frontend:
	docker exec toro_frontend npm run test -- --run
