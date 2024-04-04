import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { toNumber } from '@fuel-ts/math';
import { concat } from '@fuel-ts/utils';
import type { RequireExactlyOne } from 'type-fest';

import { WORD_SIZE } from '../../../utils/constants';
import type { TypesOfCoder } from '../AbstractCoder';
import { Coder } from '../AbstractCoder';
import { BigNumberCoder } from '../v0/BigNumberCoder';

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
  #caseIndexCoder: BigNumberCoder;
  #encodedValueSize: number;

  constructor(name: string, coders: TCoders) {
    const caseIndexCoder = new BigNumberCoder('u64');
    const encodedValueSize = Object.values(coders).reduce(
      (max, coder) => Math.max(max, coder.encodedLength),
      0
    );
    super(`enum ${name}`, `enum ${name}`, caseIndexCoder.encodedLength + encodedValueSize);
    this.name = name;
    this.coders = coders;
    this.#caseIndexCoder = caseIndexCoder;
    this.#encodedValueSize = encodedValueSize;
  }

  #encodeNativeEnum(value: string): Uint8Array {
    const valueCoder = this.coders[value];
    const encodedValue = valueCoder.encode([]);
    const caseIndex = Object.keys(this.coders).indexOf(value);

    const padding = new Uint8Array(this.#encodedValueSize - valueCoder.encodedLength);
    return concat([this.#caseIndexCoder.encode(caseIndex), padding, encodedValue]);
  }

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (typeof value === 'string' && this.coders[value]) {
      return this.#encodeNativeEnum(value);
    }

    const [caseKey, ...empty] = Object.keys(value);
    if (!caseKey) {
      throw new FuelError(ErrorCode.INVALID_DECODE_VALUE, 'A field for the case must be provided.');
    }
    if (empty.length !== 0) {
      throw new FuelError(ErrorCode.INVALID_DECODE_VALUE, 'Only one field must be provided.');
    }
    const valueCoder = this.coders[caseKey];
    const caseIndex = Object.keys(this.coders).indexOf(caseKey);
    const encodedValue = valueCoder.encode(value[caseKey]);

    return new Uint8Array([...this.#caseIndexCoder.encode(caseIndex), ...encodedValue]);
  }

  #decodeNativeEnum(caseKey: string, newOffset: number): [DecodedValueOf<TCoders>, number] {
    return [caseKey as unknown as DecodedValueOf<TCoders>, newOffset];
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    if (data.length < this.#encodedValueSize) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid enum data size.`);
    }

    const caseBytes = new BigNumberCoder('u64').decode(data, offset)[0];
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
