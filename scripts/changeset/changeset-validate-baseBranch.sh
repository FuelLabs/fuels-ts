#!/bin/bash

BASE_BRANCH=$(jq ".baseBranch" <.changeset/config.json | sed "s/\"//g")

if [ "$BASE_BRANCH" != "$GITHUB_BASE_REF" ]; then
    echo "Changeset config's baseBranch does not match PR base branch. Please update the changeset's config to match the PR base branch."
    exit 1
fi
