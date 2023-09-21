import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';

import { supportedTypes } from './supportedTypes';

export function makeType(params: { rawAbiType: IRawAbiTypeRoot }) {
  const { rawAbiType } = params;
  const { type } = rawAbiType;

  const TypeClass = supportedTypes.find((tc) => tc.isSuitableFor({ type }));

  if (!TypeClass) {
    throw new FuelError(ErrorCode.TYPE_NOT_SUPPORTED, `Type not supported: ${type}`);
  }

  return new TypeClass(params);
}
