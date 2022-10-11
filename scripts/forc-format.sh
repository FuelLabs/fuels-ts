#!/bin/bash

forc_projects=$(find . -type f -name "Forc.toml")
main_dir=$(pwd)

for i in $forc_projects; do
    cd ${i/Forc.toml/''}
    forc fmt
    cd $main_dir
done