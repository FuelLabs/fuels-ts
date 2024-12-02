import { type Matcher } from '../../matchers/sway-type-matchers';
import type { Coder, GetCoderFn, GetCoderParams } from '../abi-coder-types';

import { createCoderMatcher, type SupportedCoder, type SupportedCoders } from './matching';
import { v1 } from './v1/v1';

export class AbiEncoding {
  private supportedEncodings: Record<string, SupportedCoders> = {
    '1': v1,
  };

  public coders: SupportedCoders;
  private matcher: Matcher<SupportedCoder | undefined>;

  private constructor(version: string) {
    const coders = this.supportedEncodings[version as keyof typeof this.supportedEncodings];
    this.coders = coders;
    this.matcher = createCoderMatcher(this.coders);
  }

  static from(version: string): AbiEncoding {
    return new AbiEncoding(version);
  }

  static v1 = this.from('1');

  public getCoder: GetCoderFn = (opts: GetCoderParams): Coder => {
    const coder = this.matcher(opts.type);
    if (!coder) {
      throw new Error(`Unsupported coder type "${opts.type.swayType}" for element "${opts.name}"`);
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
