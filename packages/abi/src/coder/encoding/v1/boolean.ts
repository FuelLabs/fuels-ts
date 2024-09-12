import { bn, toBytes } from '@fuel-ts/math';

import type { Coder } from '../encoding.types';

export const bool: Coder<boolean> = {
  encodedLength: 1,
  encode: (value: boolean): Uint8Array => toBytes(value ? 1 : 0, bool.encodedLength),
  decode: (data: Uint8Array): boolean => {
    const decoded = bn(data).toNumber();

    if (decoded === 0) {
      return false;
    }

    if (decoded === 1) {
      return true;
    }

    throw new Error('The value "blahmeh" is not valid.');
  },
};
