import type { ParamType } from '@ethersproject/abi';
import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber as BN } from '@ethersproject/bignumber';
import { arrayify, concat } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';

const logger = new Logger(process.env.BUILD_VERSION || '~');

/**
 * Convert value to a Byte Array
 */
export function getBytes(value: BigNumberish): Uint8Array {
  return arrayify(BN.from(value));
}

/**
 * Pad a bytes array depending on word size
 */
export function pad(bytes: Uint8Array, wordSize: number): Uint8Array {
  const PADDING = new Uint8Array(wordSize);
  if (bytes.length > wordSize) {
    logger.throwError('Value out-of-bounds', Logger.errors.BUFFER_OVERRUN, {
      length: wordSize,
      offset: bytes.length,
    });
  }
  if (bytes.length % wordSize) {
    return concat([PADDING.slice(bytes.length % wordSize), bytes]);
  }

  return bytes;
}

export function filterEmptyParams<T>(types: T): T;
export function filterEmptyParams(types: ReadonlyArray<string | ParamType>) {
  return types.filter((t) => (t as Readonly<ParamType>)?.type !== '()' && t !== '()');
}

export default {
  pad,
  getBytes,
  filterEmptyParams,
};
