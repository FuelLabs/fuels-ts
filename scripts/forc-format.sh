#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)
authors="authors = [\"Fuel Labs <contact@fuel.sh>\"]"

for i in $forc_projects; do
    cd "${i/Forc.toml/''}" || exit

    eval "$forc_fmt"

    # format authors field only on projects, not on workspaces
    if [ "$(head -n 1 Forc.toml)" != '[project]' ]; then
        cd "$main_dir" || exit
        continue
    fi

    if [ "$(grep "authors =" Forc.toml)" = "" ]; then
        sed -i "1 a $authors" Forc.toml
    else
        sed -i -E "s/authors =.*/${authors}/g" Forc.toml
    fi

    cd "$main_dir" || exit
done
