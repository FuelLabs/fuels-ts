import { arrayify, concat } from '@ethersproject/bytes';
import { BigNumber as BN, BigNumberish } from '@ethersproject/bignumber';
import { Logger } from '@ethersproject/logger';

const logger = new Logger('0.0.1');

export function getBytes(value: BigNumberish): Uint8Array {
  return arrayify(BN.from(value));
}

export function pad(bytes: Uint8Array, wordSize: number): Uint8Array {
  const PADDING = new Uint8Array(wordSize);
  if (bytes.length > wordSize) {
    logger.throwError('Value out-of-bounds', Logger.errors.BUFFER_OVERRUN, {
      length: wordSize,
      offset: bytes.length,
    });
  }
  if (bytes.length % wordSize) {
    bytes = concat([PADDING.slice(bytes.length % wordSize), bytes]);
  }
  return bytes;
}

export default {
  pad,
  getBytes,
};
