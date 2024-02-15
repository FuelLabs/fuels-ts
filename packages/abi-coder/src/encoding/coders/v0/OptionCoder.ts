import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { Coder } from '../AbstractCoder';

import type { InputValueOf, DecodedValueOf } from './EnumCoder';
import { EnumCoder } from './EnumCoder';

type SwayOption<T> = { None: [] } | { Some: T };
export type Option<T> = T | undefined;

export class OptionCoder<TCoders extends Record<string, Coder>> extends EnumCoder<TCoders> {
  encode(value: InputValueOf<TCoders>): Uint8Array {
    const result = super.encode(this.toSwayOption(value) as unknown as InputValueOf<TCoders>);
    return result;
  }

  toSwayOption(input: InputValueOf<TCoders>): SwayOption<unknown> {
    if (input !== undefined) {
      return { Some: input };
    }

    return { None: [] };
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    // An empty option will be one less than the expected encoded length
    if (data.length < this.encodedLength - 1) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid option data size.`);
    }

    const [decoded, newOffset] = super.decode(data, offset);
    return [this.toOption(decoded) as DecodedValueOf<TCoders>, newOffset];
  }

  toOption(output?: DecodedValueOf<TCoders>): Option<unknown> {
    if (output && 'Some' in output) {
      return output.Some;
    }

    return undefined;
  }
}
