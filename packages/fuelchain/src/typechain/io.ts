import { readFileSync } from 'fs';
import { isArray } from 'lodash';
import { dirname, relative } from 'path';

import { outputTransformers } from '../codegen/outputTransformers';
import { extractAbi as extractAbiDefault } from '../parser/abiParser';
import { debug } from '../utils/debug';

import type { Config, ExtractAbiFunction, FileDescription, Output, Services } from './types';

export function processOutput(services: Services, cfg: Config, output: Output): number {
  const { fs, mkdirp } = services;
  if (!output) {
    return 0;
  }
  const outputFds = isArray(output) ? output : [output];

  outputFds.forEach((fd) => {
    // ensure directory first
    mkdirp(dirname(fd.path));

    const finalOutput = outputTransformers.reduce(
      (content, transformer) => transformer(content, services, cfg),
      fd.contents
    );

    debug(`Writing file: ${relative(cfg.cwd, fd.path)}`);
    fs.writeFileSync(fd.path, finalOutput, 'utf8');
  });

  return outputFds.length;
}

export function loadFileDescriptions(services: Services, files: string[]): FileDescription[] {
  const fileDescriptions: FileDescription[] = files.map((path) => ({
    path,
    contents: services.fs.readFileSync(path, 'utf8'),
  }));

  return fileDescriptions;
}

export function skipEmptyAbis(paths: string[], extractAbi?: ExtractAbiFunction): string[] {
  const notEmptyAbis = paths
    .map((p) => ({ path: p, contents: readFileSync(p, 'utf-8') }))
    .filter((fd) => (extractAbi || extractAbiDefault)(fd.contents).length !== 0);

  return notEmptyAbis.map((p) => p.path);
}
