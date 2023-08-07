#!/bin/bash

set -eo pipefail

function do_forc_versions_mismatch() {
    original_file=$1
    cached_file=$2

    if [ ! -f "$original_file" ]; then
        exit 1
    fi

    if [ ! -f "$cached_file" ]; then
        echo "yes"
        return
    fi

    if [[ -n "$(diff "$cached_file" "$original_file")" ]]; then
        echo "yes"
        return
    fi

    echo "no"
}

ROOT_DIR=$(pwd -P)
CACHE_DIR="$ROOT_DIR/.forc-build-cache"
VERSION_FILE="$ROOT_DIR/packages/forc/VERSION"
SCRIPT_DIR="$ROOT_DIR/scripts/build-script/"

cd "$ROOT_DIR"

if [ ! -d "$CACHE_DIR" ]; then
    mkdir ".forc-build-cache"
fi

cd "$CACHE_DIR"

if [ ! -f "project_hashes.csv" ]; then
    touch "project_hashes.csv"
fi

declare -A project_hashes

while IFS=' ' read -r project hash; do
    project_hashes["$project"]="$hash"
done <project_hashes.csv

projects_to_rebuild=()

build_everything="$(do_forc_versions_mismatch "$VERSION_FILE" "$CACHE_DIR/VERSION")"

cd "$ROOT_DIR"

while IFS= read -r -d '' project; do
    previous_hash="${project_hashes["$project"]}"
    hash=$("$SCRIPT_DIR/hash-forc-project.sh" "$(dirname "$project")")

    if [[ "$build_everything" == "yes" ]] || [[ "$previous_hash" != "$hash" ]]; then
        projects_to_rebuild+=("$project")
        project_hashes["$project"]=$hash
    fi
done < <(find "$ROOT_DIR" -type f -name Forc.toml -not -path "$ROOT_DIR/.forc-build-cache/*" -print0)

if [[ ${#projects_to_rebuild[@]} -eq 0 ]]; then
    exit 0
fi

cd "$CACHE_DIR"

true >"Forc.toml" # create or overwrite for clean file

FORC_TOML_CONTENT="[workspace]\nmembers = ["

for p in "${projects_to_rebuild[@]}"; do
    dir="$(dirname "$p")"
    FORC_TOML_CONTENT+="\n'$dir',"
done

FORC_TOML_CONTENT+="\n]"

echo -e "$FORC_TOML_CONTENT" >Forc.toml
pnpm fuels-forc build -p "$CACHE_DIR" --finalized-asm

# # After the build succeeded, we write all the hashes into a csv file and the build's forc version

project_hashes_file_content=""

for key in "${!project_hashes[@]}"; do
    project_hashes_file_content+="$key ${project_hashes["$key"]}\n"
done

echo -e "$project_hashes_file_content" | head -n -1 >project_hashes.csv
\cp -fR "$VERSION_FILE" "$CACHE_DIR"
