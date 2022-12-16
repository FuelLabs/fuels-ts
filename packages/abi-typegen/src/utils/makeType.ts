import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';

import { supportedTypes } from './supportedTypes';

export function makeType(params: { rawAbiType: IRawAbiTypeRoot }) {
  const { rawAbiType } = params;
  const { type } = rawAbiType;

  const TypeClass = supportedTypes.find((tc) => tc.isSuitableFor({ type }));

  if (!TypeClass) {
    throw new Error(`Type not supported: ${type}`);
  }

  return new TypeClass(params);
}
