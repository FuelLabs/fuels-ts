#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

ERRORED=0
RED='\033[0;31m'
NC='\033[0m' # No Color
authors="authors = [\"Fuel Labs <contact@fuel.sh>\"]"

for i in $forc_projects; do
    cd "${i/Forc.toml/''}" || exit
    eval "$forc_fmt" --check
    if [ $? = "1" ]; then
        ERRORED=1
    fi

    # do authors checks only on projects, not on workspaces
    if [ "$(head -n 1 Forc.toml)" != '[project]' ]; then
        cd "$main_dir" || exit
        continue
    fi

    if [ "$authors" != "$(grep "authors =" Forc.toml)" ]; then
        echo -e authors field should be: $RED"authors = [\"Fuel Labs <contact@fuel.sh>\"]"$NC but is $RED"$authors"$NC
        ERRORED=1
    fi
    cd "$main_dir" || exit
done

exit $ERRORED
