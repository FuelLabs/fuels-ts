import { writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import { dirname } from 'path';

import { AbiTypeGen } from '../../../src/AbiTypeGen';
import { ProgramTypeEnum } from '../../../src/types/enums/ProgramTypeEnum';

import type { ISwayParams } from './ISwayUtilParams';
import { buildSway } from './buildSway';

/*
  Compile Sway contract to Typescript
*/
export function compileSwayToTs(params: ISwayParams) {
  // first get the json abi for it
  const json = buildSway(params);

  // than creates a new Abi instance
  const { abiFilepath, abiContents, binFilepath, binContents } = json;

  const typegen = new AbiTypeGen({
    outputDir: dirname(abiFilepath).replace('abis', 'contracts'),
    abiFiles: [
      {
        path: abiFilepath,
        contents: JSON.stringify(abiContents, null, 2),
      },
    ],
    binFiles: [
      {
        path: binFilepath,
        contents: binContents,
      },
    ],
    category: ProgramTypeEnum.CONTRACT,
  });

  // create handy shortcuts for common definitions
  const [abi] = typegen.abis;

  if (params.inPlace) {
    typegen.files.forEach((f) => {
      mkdirp.sync(dirname(f.path));
      writeFileSync(f.path, f.contents);
    });
  }

  // bundle and shoot
  return {
    abi,
    typegen,
  };
}
