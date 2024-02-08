import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber } from '@fuel-ts/math';
import type { RequireExactlyOne } from 'type-fest';

import { WORD_SIZE } from '../../../constants';
import type { TypesOfCoder } from '../abstract-coder';
import { Coder } from '../abstract-coder';
import { U64Coder } from '../v0/u64';

export type InputValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
}>;
export type DecodedValueOf<TCoders extends Record<string, Coder>> = RequireExactlyOne<{
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
}>;

const isFullyNativeEnum = (enumCoders: { [s: string]: unknown } | ArrayLike<unknown>): boolean =>
  Object.values(enumCoders).every(
    // @ts-expect-error complicated types
    ({ type, coders }) => type === '()' && JSON.stringify(coders) === JSON.stringify([])
  );

export class EnumCoder<TCoders extends Record<string, Coder>> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  name: string;
  coders: TCoders;
  #caseIndexCoder: U64Coder;
  #encodedValueSize: number;

  constructor(name: string, coders: TCoders) {
    const caseIndexCoder = new U64Coder();
    const encodedValueSize = Object.values(coders).reduce(
      (max, coder) => Math.max(max, coder.encodedLength),
      0
    );
    super('enum', `enum ${name}`, caseIndexCoder.encodedLength + encodedValueSize);
    this.name = name;
    this.coders = coders;
    this.#caseIndexCoder = caseIndexCoder;
    this.#encodedValueSize = encodedValueSize;
  }

  encode(_value: InputValueOf<TCoders>): Uint8Array {
    throw new FuelError(ErrorCode.ENCODE_ERROR, `Enum encode unsupported in v1`);
  }

  #decodeNativeEnum(caseKey: string, newOffset: number): [DecodedValueOf<TCoders>, number] {
    return [caseKey as unknown as DecodedValueOf<TCoders>, newOffset];
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    if (data.length < this.#encodedValueSize) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid enum data size.`);
    }

    const caseBytes = new U64Coder().decode(data, offset)[0];
    const caseIndex = toNumber(caseBytes);
    const caseKey = Object.keys(this.coders)[caseIndex];
    if (!caseKey) {
      throw new FuelError(
        ErrorCode.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${caseIndex}". Valid cases: ${Object.keys(this.coders)}.`
      );
    }

    const valueCoder = this.coders[caseKey];
    const offsetAndCase = offset + WORD_SIZE;

    const [decoded, newOffset] = valueCoder.decode(data, offsetAndCase);

    if (isFullyNativeEnum(this.coders)) {
      return this.#decodeNativeEnum(caseKey, newOffset);
    }

    return [{ [caseKey]: decoded } as DecodedValueOf<TCoders>, newOffset];
  }
}
