#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)
forc_fmt=$(realpath ./packages/forc-bin/forc-binaries/forc-fmt)

for i in $forc_projects; do
    cd ${i/Forc.toml/''}
    eval $forc_fmt --check
    cd $main_dir
done
