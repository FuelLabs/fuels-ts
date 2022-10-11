#!/bin/bash

if [[ -z $(git status -s) ]]
then
  echo "All files are formatted"
else
  echo "Please 'pnpm forc:format' to fix these files:"
  git status --porcelain
  exit 1
fi