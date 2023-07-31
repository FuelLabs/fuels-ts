#!/bin/bash

SWAY_PROJECT_DIR=$1
SOURCE_DIR="$SWAY_PROJECT_DIR/src"
BIN_DIR="$SWAY_PROJECT_DIR/out/debug"
CACHE_DIR="$BIN_DIR/cache"
FORC_VERSION_PATH="../packages/forc/VERSION"

if [ ! -f "$FORC_VERSION_PATH" ]; then
exit 1 # VERSION file is necessary to rebuild when FORC version changes
fi

# if build doesn't exist, then build, make cache and exit
if [ ! -d "$BIN_DIR" ]; then
    pnpm fuels-forc build -p $SWAY_PROJECT_DIR --finalized-asm
   
    cp -r "$SOURCE_DIR" "$CACHE_DIR"
    cp "$FORC_VERSION_PATH" "$BIN_DIR"
    exit 0
fi

# somebody running this script for the first time might have CACHE_DIFF fail without this
if [ ! -d "$CACHE_DIR" ]; then
mkdir "$CACHE_DIR"
fi


CACHE_DIFF=$(diff -w -B "$SOURCE_DIR" "$CACHE_DIR")
VERSION_DIFF=$(diff -w -B "$FORC_VERSION_PATH" "$BIN_DIR/VERSION")

# if anything in our sway project's src/ folder changed, rebuild
if [ "$CACHE_DIFF" != "" ] || [ "$VERSION_DIFF" != "" ]; then
    pnpm fuels-forc build -p $SWAY_PROJECT_DIR --finalized-asm

    rm -r "$CACHE_DIR"
    cp -r "$SOURCE_DIR" "$CACHE_DIR"
    rm -f "$BIN_DIR/VERSION"
    cp "$FORC_VERSION_PATH" "$BIN_DIR"

    exit 0;
fi