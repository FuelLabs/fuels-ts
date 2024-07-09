import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, resolve } from 'path';

import type { IRawAbi } from './types/interfaces/IRawAbi';
import type { IRawAbiTypeComponent, IRawAbiTypeRoot } from './types/interfaces/IRawAbiType';
import type { JsonAbi, JsonAbiComponent, JsonAbiType } from './types/interfaces/JsonAbiNew';

export const arrayToObject = () => {};
function mapComponent(type: IRawAbiTypeComponent): JsonAbiComponent {
  return {
    name: type.name,
    type: type.type.toString(),
    typeArguments: type.typeArguments?.map(mapComponent) ?? null,
  };
}
function mapType(type: IRawAbiTypeRoot): JsonAbiType {
  return {
    type: type.type,
    components: type.components?.map(mapComponent) ?? null,
    typeId: type.typeId.toString(),
    typeParameters: type.typeParameters?.map((x) => x.toString()) ?? null,
  };
}

export function mapAbi(contents: IRawAbi) {
  return {
    abiVersion: '1',
    specVersion: '1',
    encoding: '1',
    types: contents.types.map(mapType),
    configurables: contents.configurables.map((x) => ({
      ...x,
      configurableType: mapComponent(x.configurableType),
    })),
    functions:
      contents.functions.map((x) => ({
        ...x,
        inputs: x.inputs.map(mapComponent),
        output: mapComponent(x.output),
      })) ?? null,
    loggedTypes: contents.loggedTypes.map((l) => ({
      logId: l.logId.toString(),
      // @ts-expect-error bad iraw
      loggedType: mapComponent(l.loggedType),
    })),
    messagesTypes: [],
  } as JsonAbi;
}
export const transformAbi = (filepath: string) => {
  copyFileSync(filepath, filepath.replace(`.json`, `.json.bkp`));
  const contents: IRawAbi = JSON.parse(readFileSync(filepath, 'utf-8'));

  const newContents = mapAbi(contents);

  writeFileSync(filepath, JSON.stringify(newContents, null, 2));
};

const root = resolve(process.argv[2]);
console.log('the root', root);
const files = globSync('**/*-abi.json', { cwd: root });
console.log('the files', files);
files.map((f) => transformAbi(join(root, f)));
