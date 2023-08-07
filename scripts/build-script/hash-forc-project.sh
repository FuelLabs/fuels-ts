#!/usr/bin/env bash

cd "$1" || exit 1

files="$(find . -type f -name "*.sw" -o -name "Forc.toml" | sort -fnb | xargs)"
hash="$(cat $files | md5sum)"
echo "$hash"
