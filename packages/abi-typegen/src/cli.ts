import { resolve } from 'path';
import yargs from 'yargs';

import { runTypegen } from './runTypegen';

export async function run(params: { programName: string }) {
  /**
   * Parsing ARGV
   */
  const argv = yargs(process.argv)
    .usage(`${params.programName} -i ../out/*-abi.json -o ./generated/`)
    .option('input', {
      alias: 'i',
      description: 'Input global pattern or path to your `*-abi.json` files',
      type: 'string',
      demandOption: true,
    })
    .option('output', {
      alias: 'o',
      description: 'Output dir for generated TS files',
      type: 'string',
      demandOption: true,
    })
    .option('verbose', {
      alias: 'v',
      description: 'Logs output messages to console',
      type: 'boolean',
      default: 'true',
      demandOption: false,
    })
    .help()
    .alias('help', 'h')
    .parseSync();

  const cwd = process.cwd();

  const input = resolve(argv.input);
  const output = resolve(argv.output);
  const verbose = !!argv.verbose;

  await runTypegen({ cwd, input, output, verbose });
}

/*

```ts
import { runTypegen } from 'fuels'

function main () {

  const cwd = process.cwd();

  const input = resolve(argv.input);
  const output = resolve(argv.output);
  const verbose = !!argv.verbose;

  await runTypegen({ cwd, input, output, verbose });
}

```

*/
