#!/bin/bash

main_dir=$(pwd)
forc_tomls=$(find . -type f -name "Forc.toml" -not -path "./internal/**/*")
forc_fmt=$(realpath ./internal/forc/forc-binaries/forc-fmt)
expected_authors="authors = [\"Fuel Labs <contact@fuel.sh>\"]"

for forc_toml in $forc_tomls; do

    # cd into the respective forc project
    cd ${forc_toml/Forc.toml/''}

    # fix forc formatting
    eval "$forc_fmt"

    # fix TOML `authors` (for projects only, ignores workspace)
    if [ "$(head -n 1 Forc.toml)" == "[project]" ]; then

        authors=$(grep "authors =" Forc.toml)

        if [[ "$authors" != "$expected_authors" ]]; then
            sed -i.bkp "s/authors =.*/${expected_authors}/g" Forc.toml
            rm "Forc.toml.bkp"
        fi

    fi

    # back to main dir
    cd $main_dir
done
