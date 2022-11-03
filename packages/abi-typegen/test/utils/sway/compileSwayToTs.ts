import { Abi } from '../../../src/abi/Abi';

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

  const abi = new Abi({
    filepath,
    rawContents,
    outputDir: 'null',
  });

  // create handy shortcuts for common properties
  const dts = abi.getDtsDeclaration();
  const factory = abi.getFactoryDeclaration();

  // bundle and shoot
  return {
    abi,
    dts,
    factory,
  };
}
