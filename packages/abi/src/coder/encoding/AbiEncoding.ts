import { type Matcher } from '../../matchers/sway-type-matchers';

import type { Coder, GetCoderFn, GetCoderParams } from './encoding-types';
import { createCoderMatcher, type SupportedCoder, type SupportedCoders } from './matching';
import { utils } from './utils';
import { v1 } from './v1/v1';

export class AbiEncoding {
  /**
   * Encoding version 1
   *
   * See {@link https://docs.fuel.network/docs/specs/abi/argument-encoding/#version-1}
   */
  static v1 = v1;

  /**
   * Utility functions for encoding
   */
  static utils = utils;

  /**
   * Supported encodings
   */
  private supportedEncodings: Record<string, SupportedCoders> = {
    '1': AbiEncoding.v1,
  };

  public coders: SupportedCoders;
  private matcher: Matcher<SupportedCoder | undefined>;

  private constructor(version: string) {
    const coders = this.supportedEncodings[version as keyof typeof this.supportedEncodings];
    this.coders = coders;
    this.matcher = createCoderMatcher(this.coders);
  }

  /**
   * Create an AbiEncoding instance
   *
   * @param version - The version of the encoding
   * @returns An AbiEncoding instance
   */
  static from(version: string): AbiEncoding {
    return new AbiEncoding(version);
  }

  /**
   * Get a coder for a given type and name
   *
   * @param opts - The options object
   * @returns A coder
   */
  public getCoder: GetCoderFn = (opts: GetCoderParams): Coder => {
    const { type, name } = opts;
    const coder = this.matcher(type);
    if (!coder) {
      throw new Error(`Unsupported coder type "${type.swayType}" for element "${name}"`);
    }

    if (typeof coder === 'object') {
      return coder as Coder;
    }

    if (typeof coder === 'function') {
      return coder.fromAbi(opts, this.getCoder) as Coder;
    }

    return coder;
  };
}
