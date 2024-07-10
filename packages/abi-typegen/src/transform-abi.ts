import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, resolve } from 'path';

import { mapAbi } from './transform-abi-mapper';
import type { JsonAbi } from './types/interfaces/JsonAbi';

const transformAbi = (filepath: string) => {
  copyFileSync(filepath, filepath.replace(`.json`, `.json.bkp`));
  const contents: JsonAbi = JSON.parse(readFileSync(filepath, 'utf-8'));

  const newContents = mapAbi(contents);

  writeFileSync(filepath, JSON.stringify(newContents, null, 2));
};

const root = resolve(process.argv[2]);
console.log('the root', root);
const files = globSync('**/*-abi.json', { cwd: root });
console.log('the files', files);
files.map((f) => transformAbi(join(root, f)));
