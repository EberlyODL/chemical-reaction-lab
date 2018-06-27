SHELL := /usr/bin/env bash

USER=$(shell whoami)

start:
	docker-compose up

clean:
	docker-compose down --remove-orphans -v

getboxfiles:
	cp /Users/$(USER)/Box\ Sync/b-odl\ Shared/Chemical\ Reaction\ Lab/ChemRoom.dae ./assets/chemlablayout.gltf