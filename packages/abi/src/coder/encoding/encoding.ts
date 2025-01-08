import { FuelError } from '@fuel-ts/errors';
import { assertUnreachable } from '@fuel-ts/utils';

import type { Matcher } from '../../matchers/sway-type-matchers';

import type {
  AbiEncoding,
  Coder,
  CoderFactoryParameters,
  Encoding,
  SupportedCoder,
  SupportedCoders,
} from './encoding-types';
import * as v1 from './v1';

interface SupportedEncoding {
  coders: SupportedCoders;
  matcher: Matcher<SupportedCoder | undefined>;
}

const currentEncoding = v1.coders;
const supportedEncodings: Record<string, SupportedEncoding> = {
  '1': { coders: v1.coders, matcher: v1.matcher },
};

export const encoding: Encoding = {
  ...currentEncoding,
  v1: v1.coders,
  fromVersion: (version: string): AbiEncoding => {
    const supportedEncoding = supportedEncodings[version as keyof typeof supportedEncodings];
    if (!supportedEncoding) {
      throw new FuelError(
        FuelError.CODES.UNSUPPORTED_ENCODING_VERSION,
        `Unsupported encoding version "${version}"`
      );
    }

    const getCoder = (opts: CoderFactoryParameters) => {
      const { type, name } = opts;
      let coder: SupportedCoder | undefined;
      try {
        coder = supportedEncoding.matcher(type);
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
      coders: supportedEncoding.coders,
      getCoder,
    };
  },
};
