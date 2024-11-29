#!/bin/bash

main_dir=$(pwd)
forc_tomls=$(find . -type f -name "Forc.toml" -not -path "*/internal/forc/sway-repo/*")
forc_fmt=$(realpath ./internal/forc/forc-binaries/forc-fmt)
expected_authors="authors = [\"Fuel Labs <contact@fuel.sh>\"]"

ERRORED=0
RED='\033[0;31m'
NC='\033[0m' # No Color

for forc_toml in $forc_tomls; do

    # cd into the respective forc project
    cd ${forc_toml/Forc.toml/''}

    # validate forc formatting
    eval "$forc_fmt" --check
    if [ $? = "1" ]; then
        ERRORED=1
    fi

    # validate TOML `authors` (for projects only, ignores workspace)
    if [ "$(head -n 1 Forc.toml)" == "[project]" ]; then

        authors=$(grep "authors =" Forc.toml)

        if [[ "$authors" != "$expected_authors" ]]; then
            ERRORED=1
            echo -e "authors field should be: ${RED}$expected_authors ${NC} but is ${RED}$authors ${NC}"
        fi

    fi

    # back to main dir
    cd $main_dir
done

exit $ERRORED
