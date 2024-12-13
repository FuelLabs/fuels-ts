import { FuelError } from '@fuel-ts/errors';
import { assertUnreachable } from '@fuel-ts/utils';

import type {
  AbiEncoding,
  Coder,
  CoderFactoryParameters,
  Encoding,
  SupportedCoder,
  SupportedCoders,
} from './encoding-types';
import { createCoderMatcher } from './matching';
import { v1 } from './v1';

const currentEncoding = v1;
const supportedEncodings: Record<string, SupportedCoders> = {
  '1': v1,
};

export const encoding: Encoding = {
  ...currentEncoding,
  v1,
  fromVersion: (version: string): AbiEncoding => {
    const coders = supportedEncodings[version as keyof typeof supportedEncodings];
    if (!coders) {
      throw new FuelError(
        FuelError.CODES.UNSUPPORTED_ENCODING_VERSION,
        `Unsupported encoding version "${version}"`
      );
    }

    const matcher = createCoderMatcher(coders);

    const getCoder = (opts: CoderFactoryParameters) => {
      const { type, name } = opts;
      let coder: SupportedCoder | undefined;
      try {
        coder = matcher(type);
      } catch (error) {
        throw new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          `Unsupported coder type "${type.swayType}" for element "${name}"`
        );
      }

      if (!coder) {
        throw new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          `Unsupported coder type "${type.swayType}" for element "${name}"`
        );
      }

      if (typeof coder === 'object') {
        return coder as Coder;
      }

      if (typeof coder === 'function') {
        return coder.factory(opts, getCoder);
      }

      // Coders should always be either an object or function
      return assertUnreachable(coder as never);
    };

    return {
      coders,
      getCoder,
    };
  },
};
