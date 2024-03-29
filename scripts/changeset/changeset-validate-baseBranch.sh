#!/bin/bash

BASE_BRANCH=$(jq ".baseBranch" <.changeset/config.json | sed "s/\"//g")

if [ "$BASE_BRANCH" != "$1" ]; then
    echo "Changeset config.json's baseBranch does not match PR base branch. Please update the changeset's config from $BASE_BRANCH to $1."
    exit 1
fi
