import { NumberCoder, StructCoder } from '@fuel-ts/abi-coder';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

export type TxPointer = {
  /** Block height (u32) */
  blockHeight: number;

  /** Transaction index (u16) */
  txIndex: number;
};

export class TxPointerCoder extends StructCoder<{
  blockHeight: NumberCoder;
  txIndex: NumberCoder;
}> {
  constructor() {
    super('TxPointer', {
      blockHeight: new NumberCoder('u32', { padToWordSize: true }),
      txIndex: new NumberCoder('u16', { padToWordSize: true }),
    });
  }

  public static decodeFromGqlScalar(value: string) {
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
  }
}
