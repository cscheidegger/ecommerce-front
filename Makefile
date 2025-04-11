
.PHONY: up down logs ps build rebuild backup migrate shell help

# Default target
help:
	@echo "Proteus.lab Docker Commands"
	@echo "--------------------------"
	@echo "make up        - Start all services"
	@echo "make down      - Stop all services"
	@echo "make logs      - View logs from all services"
	@echo "make ps        - List running services"
	@echo "make build     - Build all containers"
	@echo "make rebuild   - Rebuild all containers from scratch"
	@echo "make backup    - Backup the database"
	@echo "make migrate   - Run database migrations"
	@echo "make shell-api - Open a shell in the API container"
	@echo "make shell-db  - Open a shell in the PostgreSQL container"

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# View logs
logs:
	docker-compose logs -f

# List running services
ps:
	docker-compose ps

# Build all containers
build:
	docker-compose build

# Rebuild all containers from scratch
rebuild:
	docker-compose build --no-cache

# Backup the database
backup:
	docker-compose exec api /app/scripts/backup-db.sh

# Run database migrations
migrate:
	docker-compose exec api alembic upgrade head

# Open a shell in the API container
shell-api:
	docker-compose exec api /bin/bash

# Open a shell in the PostgreSQL container
shell-db:
	docker-compose exec postgres psql -U postgres -d proteuslab
