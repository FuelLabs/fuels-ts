import { writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';

import { AbiTypeGen } from '../../../src';

import type { ISwayParams } from './ISwayUtilParams';
import { compileSwayToJson } from './compileSwayToJson';

/*
  Compile Sway contract to Typescript
*/
export function compileSwayToTs(params: ISwayParams) {
  // first get the json abi for it
  const json = compileSwayToJson(params);

  // than creates a new Abi instance
  const { filepath, rawContents } = json;

  const typegen = new AbiTypeGen({
    outputDir: dirname(filepath).replace('abis', 'contracts'),
    abiFiles: [
      {
        path: filepath,
        contents: JSON.stringify(rawContents, null, 2),
      },
    ],
  });

  // create handy shortcuts for common definitions
  const [abi] = typegen.abis;

  const dts = abi.getDtsDeclaration();
  const factory = abi.getFactoryDeclaration();

  if (params.inPlace) {
    typegen.files.forEach((f) => {
      mkdirp.sync(dirname(f.path));
      writeFileSync(f.path, f.contents);
    });
  }

  // bundle and shoot
  return {
    abi,
    dts,
    factory,
  };
}
