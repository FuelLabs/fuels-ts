#!/bin/bash
if [[ -z $(git diff-index --quiet HEAD --) ]]
then
  echo "All files are formatted"
else
  echo "Please 'forc fmt' these files:"
  git status --porcelain
  exit 1
fi