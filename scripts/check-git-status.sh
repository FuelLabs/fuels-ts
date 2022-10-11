#!/bin/bash
if [[ -z $(git diff-index --quiet HEAD --) ]]
then
  echo "Please 'forc fmt' these files:"
  git status --porcelain
  exit 1
else
  echo "All files are formatted"
  
fi