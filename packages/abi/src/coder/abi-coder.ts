import type { Abi, AbiFunction, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import type { AbiCoderFunction } from './abi-coder-types';
import { v1 } from './encoding';

export class AbiCoder {
  private supportedEncodings = {
    '1': v1,
  } as const;

  // Internal properties
  private abi: Abi;
  private encoding: (typeof this.supportedEncodings)[keyof typeof this.supportedEncodings];

  // Exposed properties
  public readonly functions: Record<string, AbiCoderFunction>;

  private constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
    this.encoding =
      this.supportedEncodings[this.abi.specVersion as keyof typeof this.supportedEncodings];
    this.functions = Object.fromEntries(
      this.abi.functions.map((fn) => [fn.name, this.fromFunction(fn)])
    );
  }

  static fromAbi(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }

  private fromFunction(fn: AbiFunction): AbiCoderFunction {
    return {
      name: fn.name,
      arguments: this.encoding.coders.tuple({
        coders: fn.inputs.map((input) => this.encoding.getCoder(input)),
      }),
      output: this.encoding.getCoder({ type: fn.output }),
    };
  }
}
