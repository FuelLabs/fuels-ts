import { getCoder } from './encoding/v1/coder-matcher';
import type { Coder } from './encoding/v1/coders/types';

// Placeholder
export class AbiCoder {
  public encode(type: string, value: unknown) {
    const coder = getCoder(type) as Coder & { encode: (value: unknown) => unknown };

    return coder.encode(value);
  }
}
