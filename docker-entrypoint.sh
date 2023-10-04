#!/bin/sh

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "-- First container startup --"
    ###
    npx sequelize db:migrate
    ###
else
    echo "-- Not first container startup --"
fi

# Entrypoint
npm run start:prod
