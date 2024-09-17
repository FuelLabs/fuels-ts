import type { Abi, AbiConfigurable, AbiFunction, AbiLoggedType, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import type { AbiCoderConfigurable, AbiCoderFunction } from './abi-coder-types';
import { AbiEncoding } from './encoding/encoding';

export class AbiCoder {
  // Internal properties
  private abi: Abi;
  private encoding: AbiEncoding;

  // Exposed properties
  public readonly functions: Record<string, AbiCoderFunction>;

  private constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
    this.encoding = AbiEncoding.from(this.abi.encodingVersion);
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

  private fromConfigurable(configurable: AbiConfigurable): AbiCoderConfigurable {
    // @TODO find out what this offset is used for...
    const offset = configurable.offset;

    const configurableCoder = this.encoding.getCoder(configurable);
    return {
      name: configurable.name,
      value: configurableCoder,
    };
  }

  private fromLogged(logged: AbiLoggedType) {
    return {
      logId: logged.logId,
      type: this.encoding.getCoder({ name: logged.logId, type: logged.type }),
    };
  }
}
