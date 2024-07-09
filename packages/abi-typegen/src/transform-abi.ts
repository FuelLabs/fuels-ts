import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, resolve } from 'path';

import type {
  JsonAbi,
  JsonAbiArgument,
  JsonAbiComponent,
  JsonAbiType,
} from './types/interfaces/JsonAbiNew';

function mapComponent(c: JsonAbiComponent | JsonAbiArgument): JsonAbiComponent {
  return {
    name: 'name' in c ? c.name : '',
    type: c.type.toString(),
    typeArguments: c.typeArguments?.map(mapComponent) ?? null,
  };
}
function mapType(type: JsonAbiType): JsonAbiType {
  return {
    type: type.type,
    components: type.components?.map(mapComponent) ?? null,
    typeId: type.typeId.toString(),
    typeParameters: type.typeParameters?.map((x) => x.toString()) ?? null,
  };
}

export function mapAbi(contents: JsonAbi) {
  return {
    abiVersion: '1',
    specVersion: '1',
    encoding: '1',
    types: contents.types.map(mapType),
    functions:
      contents.functions.map((x) => ({
        ...x,
        inputs: x.inputs.map(mapComponent),
        output: mapComponent(x.output),
      })) ?? null,
    loggedTypes: contents.loggedTypes.map((l) => ({
      logId: l.logId.toString(),
      loggedType: mapComponent(l.loggedType),
    })),
    messagesTypes: [],
    configurables: contents.configurables.map((x) => ({
      ...x,
      configurableType: mapComponent(x.configurableType),
    })),
  } as JsonAbi;
}
export const transformAbi = (filepath: string) => {
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
