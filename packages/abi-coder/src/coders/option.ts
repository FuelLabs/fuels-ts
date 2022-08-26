import type { DecodedValue } from './abstract-coder';
import type Coder from './abstract-coder';
import type { InputValueOf, DecodedValueOf } from './enum';
import EnumCoder from './enum';

type Option<T> = T | undefined;
type SwayOption<T> = { None: [] } | { Some: T };

export default class OptionCoder<TCoders extends Record<string, Coder>> extends EnumCoder<TCoders> {
  encode(value: InputValueOf<TCoders>): Uint8Array {
    const result = super.encode(
      this.toSwayOption(
        value as unknown as Option<DecodedValue>
      ) as unknown as InputValueOf<TCoders>
    );
    return result;
  }

  toSwayOption(input?: Option<DecodedValue>): SwayOption<DecodedValue> {
    if (input !== undefined) {
      return { Some: input };
    }

    return { None: [] };
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    const [decoded, newOffset] = super.decode(data, offset);
    return [
      this.toOption(decoded as unknown as SwayOption<DecodedValue>) as DecodedValueOf<TCoders>,
      newOffset,
    ];
  }

  toOption(output?: SwayOption<DecodedValue>): Option<DecodedValue> {
    if (output && 'Some' in output) {
      return output.Some;
    }

    return undefined;
  }
}
