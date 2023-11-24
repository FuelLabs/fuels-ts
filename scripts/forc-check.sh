#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

ERRORED=0
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
for i in $forc_projects; do
    cd ${i/Forc.toml/''}
    eval $forc_fmt --check
    if [ $? = "1" ]; then
        ERRORED=1
    fi
    authors=$(cat Forc.toml | grep authors)
    if [ -n "$authors" ] && [ "$authors" != "authors = [\"Fuel Labs <contact@fuel.sh>\"]" ]; then
        echo -e authors field should be: $RED"authors = [\"Fuel Labs <contact@fuel.sh>\"]"$NC but is $RED"$authors"$NC
        ERRORED=1
    fi
    cd $main_dir
done

exit $ERRORED
