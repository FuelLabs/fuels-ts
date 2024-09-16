import { FuelError } from '@fuel-ts/errors';
import { log } from 'console';

import type { Coder } from '../../abi-coder-types';

export const withValidation = <T>(coder: Coder<T>): Coder<T> => {
  const context = {};
  return {
    type: coder.type,
    encodedLength: coder.encodedLength,
    encode: (value: T): Uint8Array => {
      let encoded;

      try {
        encoded = coder.encode(value);
      } catch (e) {
        log('Failed to encode value', { cause: e });
        throw e;
      }
      return encoded;
    },
    decode: (data: Uint8Array): T => {
      const expectedEncodedLength = coder.encodedLength(data);
      if (expectedEncodedLength !== data.length) {
        log('Invalid data length', {
          expectedLength: expectedEncodedLength,
          actualLength: data.length,
        });
        throw new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid data length for ${coder.type}.`);
      }
      let decoded;

      try {
        decoded = coder.decode(data);
      } catch (e) {
        log('Failed to decode data', { cause: e });
        throw e;
      }

      return decoded;
    },
  };
};
