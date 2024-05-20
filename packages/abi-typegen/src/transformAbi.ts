import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, resolve } from 'path';

import type { IRawAbi, IRawAbiNew } from './types/interfaces/IRawAbi';

export const arrayToObject = () => {};

export const transformAbi = (filepath: string) => {
  copyFileSync(filepath, filepath.replace(`.json`, `.json.bkp`));

  const contents: IRawAbi = JSON.parse(readFileSync(filepath, 'utf-8'));

  const newContents: IRawAbiNew = {
    ...contents,
    types: {},
  };

  contents.types.forEach((type) => {
    const typeIdStr = String(type.typeId);
    newContents.types[typeIdStr] = {
      ...type,
      typeId: typeIdStr,
    };
  });

  writeFileSync(filepath, JSON.stringify(newContents, null, 2));
};

const root = resolve(process.argv[2]);
const files = globSync('**/*-abi.json', { cwd: root });

files.map((f) => transformAbi(join(root, f)));
