#!/bin/bash

# Run syncpack to list mismatches
result=$(syncpack list-mismatches)

# Check if there are mismatches
if [ ! -z "$result" ]; then
  echo "Dependency mismatches detected:"
  echo "$result"
  exit 1
else
  echo "No dependency mismatches detected."
fi
