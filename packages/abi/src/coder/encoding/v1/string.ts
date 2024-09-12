import { bn, toUtf8Bytes } from '@fuel-ts/math';

import type { Coder } from '../encoding.types';

export const string = (): Coder<string> => ({
  encodedLength: 1,
  encode: (value: string): Uint8Array => toUtf8Bytes(value),
  decode: (data: Uint8Array): string => '',
});
