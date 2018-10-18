SHELL := /usr/bin/env bash
include .env
export $(shell sed 's/=.*//' .env)
USER=$(shell whoami)

start-prod:
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml build
	make build-frontend
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml build
	docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d
	make prisma-update

start-dev:
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml build
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d
	make prisma-update

start-backend:
	docker-compose build
	docker-compose up -d
	make prisma-update

build-frontend:
	docker-compose run --rm node npm run frontend:parcel:build

prisma-update:
	docker-compose run --rm node npm run backend:prisma:update

# Forces an update
prisma-update-force:
	docker-compose run --rm node npm run backend:prisma:update:force