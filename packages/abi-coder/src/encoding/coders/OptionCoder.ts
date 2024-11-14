import type { Coder } from './AbstractCoder';
import type { InputValueOf, DecodedValueOf } from './EnumCoder';
import { EnumCoder } from './EnumCoder';

type SwayOption<T> = { None: [] } | { Some: T };
export type Option<T> = T | undefined;

export class OptionCoder<TCoders extends Record<string, Coder>> extends EnumCoder<TCoders> {
  override encode(value?: Option<unknown>): Uint8Array {
    const result = super.encode(this.toSwayOption(value) as unknown as InputValueOf<TCoders>);
    return result;
  }

  private toSwayOption(input?: Option<unknown>): SwayOption<unknown> {
    if (input !== undefined) {
      return { Some: input };
    }

    return { None: [] };
  }

  public override decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    const [decoded, newOffset] = super.decode(data, offset);
    return [this.toOption(decoded) as DecodedValueOf<TCoders>, newOffset];
  }

  private toOption(output?: DecodedValueOf<TCoders>): Option<unknown> {
    if (output && 'Some' in output) {
      return output.Some;
    }

    return undefined;
  }
}
