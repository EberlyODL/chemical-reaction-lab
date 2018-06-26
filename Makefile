SHELL := /usr/bin/env bash

start:
	docker-compose up

clean:
	docker-compose down --remove-orphans -v

getboxfiles:
	cp /Users/scienceonlineed/Box\ Sync/b-odl\ Shared/Chemical\ Reaction\ Lab/ChemRoom.dae ./assets/ChemRoom.dae