SHELL := /usr/bin/env bash

USER=$(shell whoami)

start:
	docker-compose up

build:
	docker-compose build

connect:
	docker-compose run parcel bash

clear-cache:
	rm -rf ./.cache

clean:
	rm -rf ./.cache
	docker-compose down --remove-orphans -v

getboxfiles:
	cp /Users/$(USER)/Box\ Sync/b-odl\ Shared/Chemical\ Reaction\ Lab/chemlablayout.gltf dist/assets/chemlablayout.gltf