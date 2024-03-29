#!/bin/bash

BASE_BRANCH=$(jq ".baseBranch" <.changeset/config.json | sed "s/\"//g")

if [ "$BASE_BRANCH" != "$GITHUB_BASE_REF" ]; then
    echo "Changeset config.json's baseBranch does not match PR base branch. Please update the changeset's config from $BASE_BRANCH to $GITHUB_BASE_REF."
    exit 1
fi
