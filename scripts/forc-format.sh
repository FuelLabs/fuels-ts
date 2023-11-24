#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

for i in $forc_projects; do
    cd "${i/Forc.toml/''}" || exit

    eval "$forc_fmt"

    if [ "$(head -n 1 Forc.toml)" != '[project]' ]; then
        cd "$main_dir" || exit
        continue
    fi

    authors_line=$(
        awk '/authors =.*/ { print NR }' Forc.toml
    )

    new_content=""
    if [ "$authors_line" = "" ]; then
        new_content=$(awk 'NR == 2 {print "authors = [\"Fuel Labs <contact@fuel.sh>\"]"} 1' Forc.toml)
    else
        new_content=$(awk -v line="$authors_line" 'NR == line {$0="authors = [\"Fuel Labs <contact@fuel.sh>\"]"} 1' Forc.toml)
    fi

    echo "$new_content" >Forc.toml

    cd "$main_dir" || exit
done
