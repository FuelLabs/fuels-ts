import type { ICoder } from '../../types/ICoder';

export type TypesOfCoder<TCoder> = TCoder extends Coder<infer TInput, infer TDecoded>
  ? { Input: TInput; Decoded: TDecoded }
  : never;

export abstract class Coder<TInput = unknown, TDecoded = unknown>
  implements ICoder<TInput, TDecoded>
{
  readonly name: string;
  readonly type: string;
  readonly encodedLength: number;

  constructor(name: string, type: string, encodedLength: number) {
    this.name = name;
    this.type = type;
    this.encodedLength = encodedLength;
  }

  abstract encode(value: TInput, length?: number): Uint8Array;

  abstract decode(data: Uint8Array, offset: number, length?: number): [TDecoded, number];
}
