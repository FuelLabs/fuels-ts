#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

CORRECT_AUTHORS="authors = [\"Fuel Labs <contact@fuel.sh>\"]"

for i in $forc_projects; do
    cd ${i/Forc.toml/''}
    eval $forc_fmt
    authors=$(cat Forc.toml | grep authors)
    if [ -n "$authors" ] && [ "$authors" != "$CORRECT_AUTHORS" ]; then
        echo $authors
        # sed -i "s/$authors/$CORRECT_AUTHORS/g" Forc.toml
    fi
    cd $main_dir
done
