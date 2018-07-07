SHELL := /usr/bin/env bash
include .env
export $(shell sed 's/=.*//' .env)
USER=$(shell whoami)

start:
	docker-compose up

dev:
	make clean
	docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build

connect:
	docker-compose run parcel bash

clear-cache:
	rm -rf ./.cache

clean:
	rm -rf ./.cache
	rm -rf node_modules
	docker-compose down --remove-orphans -v

getboxfiles:
	cp /Users/$(USER)/Box\ Sync/b-odl\ Shared/Chemical\ Reaction\ Lab/chemlablayout.gltf dist/assets/chemlablayout.gltf
	cp /Users/$(USER)/Box\ Sync/b-odl\ Shared/Chemical\ Reaction\ Lab/OBJs/ dist/assets/OBJs

deploy:
	surge -d odl-crl.surge.sh dist