import type { Coder } from '@fuel-ts/abi';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { coders } from './coders';

export type TxPointer = {
  /** Block height (u32) */
  blockHeight: number;

  /** Transaction index (u16) */
  txIndex: number;
};

export interface TxPointerCoder extends Coder<TxPointer, TxPointer> {
  decodeFromGqlScalar: (value: string) => TxPointer;
}

const base = coders.struct({
  blockHeight: coders.u32,
  txIndex: coders.u16,
});

export const txPointerCoder: TxPointerCoder = {
  type: 'TxPointer',
  encode: base.encode,
  decode: base.decode,
  decodeFromGqlScalar: (value: string): TxPointer => {
    // taken from https://github.com/FuelLabs/fuel-vm/blob/7366db6955589cb3444c9b2bb46e45c8539f19f5/fuel-tx/src/tx_pointer.rs#L87
    if (value.length !== 12) {
      throw new FuelError(
        ErrorCode.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${value.length}. It must have length 12.`
      );
    }
    const [blockHeight, txIndex] = [value.substring(0, 8), value.substring(8)];
    return {
      blockHeight: parseInt(blockHeight, 16),
      txIndex: parseInt(txIndex, 16),
    };
  },
};
