export * from './utils/capitalizeString';
export * from './utils/chunkAndPadBytes';
export * from './utils/concat';
export * from './utils/arrayify';
export * from './utils/hexlify';
export * from './utils/normalizeString';
export * from './utils/date-time';
export * from './utils/types';
export * from './utils/sleep';
export * from './utils/defaultSnapshotConfigs';
export * from './utils/isDefined';
export * from './utils/base58';
export * from './utils/dataSlice';
export * from './utils/toUtf8Bytes';
export * from './utils/toUtf8String';
export * from './utils/bytecode';
export * from './utils/split-utxos';

/**
 * Used to verify that a switch statement exhausts all variants.
 */
export function assertUnreachable(_x: never): never {
  throw new Error("Didn't expect to get here");
}
