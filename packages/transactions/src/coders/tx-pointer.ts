import { NumberCoder, StructCoder } from '@fuel-ts/abi-coder';

export type TxPointer = {
  /** Block height (u32) */
  blockHeight: number;

  /** Transaction index (u16) */
  txIndex: number;
};

export class TxPointerCoder extends StructCoder<{
  blockHeight: NumberCoder<'u32'>;
  txIndex: NumberCoder<'u16'>;
}> {
  constructor() {
    super('TxPointer', {
      blockHeight: new NumberCoder('u32'),
      txIndex: new NumberCoder('u16'),
    });
  }
}
