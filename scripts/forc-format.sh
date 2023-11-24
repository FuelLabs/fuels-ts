#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

for i in $forc_projects; do
    cd "${i/Forc.toml/''}" || exit

    eval "$forc_fmt"

    authors_line=$(
        awk '/authors.*/ { print NR }' Forc.toml
    )
    if [ -n "$authors_line" ]; then
        new_content=$(awk -v line="$authors_line" 'NR==2 {$0="authors = [\"Fuel Labs <contact@fuel.sh>\"]"} 1' Forc.toml)
        echo "$new_content" >Forc.toml
    fi

    cd "$main_dir" || exit
done
