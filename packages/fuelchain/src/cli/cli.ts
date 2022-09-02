#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as prettier from 'prettier';

import { runTypeChain } from '../typechain/runTypeChain';
import type { Config } from '../typechain/types';
import { detectInputsRoot } from '../utils/files';
import { glob } from '../utils/glob';
import { logger } from '../utils/logger';

import { parseArgs } from './parseArgs';

function getFilesToProcess(cwd: string, filesOrPattern: string[]) {
  let res = glob(cwd, filesOrPattern);

  if (res.length === 0) {
    // If there are no files found, but first parameter is surrounded with single quotes, we try again without quotes
    const match = filesOrPattern[0].match(/'([\s\S]*)'/)?.[1];
    if (match) res = glob(cwd, [match]);
  }

  return res;
}

async function main() {
  (global as any).IS_CLI = true;
  const cliConfig = parseArgs();
  const cwd = process.cwd();

  const files = getFilesToProcess(cwd, cliConfig.files);
  if (files.length === 0) {
    throw new Error(
      `No files passed.\n\`${cliConfig.files}\` didn't match any input files in ${cwd}`
    );
  }

  const config: Config = {
    cwd,
    target: cliConfig.target,
    outDir: cliConfig.outDir,
    allFiles: files,
    filesToProcess: files,
    inputDir: cliConfig.inputDir || detectInputsRoot(files),
    prettier,
    flags: {
      ...cliConfig.flags,
      environment: undefined,
    },
  };

  const result = await runTypeChain(config);
  // eslint-disable-next-line no-console
  console.log(`Successfully generated ${result.filesGenerated} typings!`);
}

main().catch((e) => {
  logger.error('Error occured: ', e.message);

  const stackTracesEnabled = process.argv.includes('--show-stack-traces');
  if (stackTracesEnabled) {
    logger.error('Stack trace: ', e.stack);
  } else {
    logger.error('Run with --show-stack-traces to see the full stacktrace');
  }
  process.exit(1);
});
