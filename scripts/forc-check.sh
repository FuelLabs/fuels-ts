#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc/forc-binaries/forc-fmt)

ERRORED=0

for i in $forc_projects; do
    cd ${i/Forc.toml/''}
    eval $forc_fmt --check
    if [ $? = "1" ]; then
        ERRORED=1
    fi
    cd $main_dir
done

exit $ERRORED
