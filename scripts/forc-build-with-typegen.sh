#!/usr/bin/env bash

set -o pipefail

output=$(pnpm fuels-forc build -p test/fixtures/forc-projects --release | tee -a /dev/tty)

exit_code=$?

if [ $exit_code -ne 0 ]; then
    exit $exit_code
fi

res=$(echo "$output" | grep Compiling | grep -v library | sed -E 's/.* (predicate|contract|script).*\((.*)\)/\1 -i \2\/out\/release\/*-abi.json/g')

contracts=$(echo "$res" | grep "contract " | sed -E 's/\w+ //' | xargs)
scripts=$(echo "$res" | grep "script " | sed -E 's/\w+ //' | xargs)
predicates=$(echo "$res" | grep "predicate " | sed -E 's/\w+ //' | xargs)

if [[ -n "${contracts}" ]]; then
    eval "pnpm fuels typegen --contract $contracts -o test/typegen/contracts"
fi

if [[ -n "${scripts}" ]]; then
    eval "pnpm fuels typegen --script $scripts -o test/typegen/scripts"
fi

if [[ -n "${predicates}" ]]; then
    eval "pnpm fuels typegen --predicate $predicates -o test/typegen/predicates"
fi
