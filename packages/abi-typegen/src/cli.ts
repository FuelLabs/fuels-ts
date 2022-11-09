import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';
import mkdirp from 'mkdirp';
import { basename, resolve } from 'path';
import rimraf from 'rimraf';
import yargs from 'yargs';

import { AbiTypeGen } from './AbiTypeGen';
import type { IFile } from './interfaces/IFile';

export async function run(params: { programName: string }) {
  const cwd = process.cwd();
  const cwdBasename = basename(process.cwd());

  /**
   * Parsing ARGV
   */
  const argv = yargs(process.argv)
    .usage(`${params.programName} -i ../out/*-abi.json -o ./generated/`)
    .option('inputs', {
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

  const { inputs, output, verbose } = argv;

  let { log } = console;
  if (!verbose) {
    log = () => ({});
  }

  const outputDir = resolve(output);

  /*
   Expanding globals and collecting files' contents
   */
  const abiFilePaths = glob(inputs, { cwd });

  const abiFiles = abiFilePaths.map((abiFilepath) => {
    const file: IFile = {
      path: abiFilepath,
      contents: readFileSync(abiFilepath, 'utf-8'),
    };
    return file;
  });

  /*
    Starting the engine
  */
  const abiTypeGen = new AbiTypeGen({
    outputDir,
    abiFiles,
  });

  /*
    Generating files
   */
  log('Generating files..\n');

  mkdirp.sync(`${outputDir}/factories`);

  abiTypeGen.files.forEach((file) => {
    rimraf.sync(file.path);
    writeFileSync(file.path, file.contents);
    const trimPathRegex = new RegExp(`^.+${cwdBasename}/`, 'm');
    log(` - ${file.path.replace(trimPathRegex, '')}`);
  });

  log('\nDone.⚡');
}
