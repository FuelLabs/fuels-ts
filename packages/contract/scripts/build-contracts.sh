#!/bin/sh

forc build -p src/storage-test-contract --print-finalized-asm
forc build -p src/call-test-contract --print-finalized-asm
forc build -p src/token-test-contract/token_contract --print-finalized-asm
