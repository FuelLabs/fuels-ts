import { B256Coder, NumberCoder, StructCoder } from '@fuel-ts/abi-coder';

export type UtxoId = {
  /** Transaction ID (b256) */
  transactionId: string;
  /** Output index (u8) */
  outputIndex: number;
};

export class UtxoIdCoder extends StructCoder<{
  transactionId: B256Coder;
  outputIndex: NumberCoder;
}> {
  constructor() {
    super('UtxoId', {
      transactionId: new B256Coder(),
      outputIndex: new NumberCoder('u16', { padToWordSize: true }),
    });
  }
}
