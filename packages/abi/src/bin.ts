import { getBinaryVersions } from '@fuel-ts/versions/cli';
import { Command } from 'commander';

import { configureTypegenCliOptions } from './cli';

const program = new Command();

program.name('fuels-typegen');
program.version(getBinaryVersions().FUELS);
program.usage(`-i ../out/*-abi.json -o ./generated/`);
program.option('-S, --silent', 'Omit output messages', false);

configureTypegenCliOptions(program);

program.parse(process.argv);
