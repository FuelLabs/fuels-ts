/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import type { Abi, AbiFunction, AbiSpecification, AbiType, AbiTypeComponent } from '../parser';
import { AbiParser } from '../parser';

import type { AbiCoderFunction, InputValue } from './abi-coder-types';
import type { Coder, CoderFactory } from './encoding';
import { v1 } from './encoding';
import type { EncodingV1 } from './encoding/v1';

const tupleRegEx = /^\((?<items>.*)\)$/;

class EncodingRepository {
  private encodings = {
    '1': v1,
  } as const;

  // Exposed internally
  public coders: EncodingV1;

  // Entrypoint
  public static fromAbi(abi: Abi): EncodingRepository {
    return new EncodingRepository(abi);
  }

  private constructor(abi: Abi) {
    const encodingVersion = abi.encodingVersion;
    const encoding = this.encodings[encodingVersion as keyof typeof this.encodings];
    if (encoding === undefined) {
      throw new Error(`Unsupported encoding version: ${encodingVersion}`);
    }

    this.coders = encoding;
  }

  // TODO: change to matching
  public getCoder(opts: { name?: string; type: AbiType }): Coder {
    const { name, type } = opts;

    // Highly rudimentary type matching
    const coder = this.coders[type.swayType as keyof EncodingV1];
    if (typeof coder === 'object') {
      return coder as Coder;
    }

    if (typeof coder === 'function') {
      const makeCoder = coder as CoderFactory;
      return makeCoder(opts, this.getCoder);
    }

    // A not implemented coder (to avoid compile time errors)
    // TODO: throw a coder not found error here
    return {
      encodedLength: 0,
      encode: () => {
        throw new Error('Not implemented');
      },
      decode: () => {
        throw new Error('Not implemented');
      },
    };
  }
}

export class AbiCoder {
  private abi: Abi;
  private encoding: EncodingRepository;

  // { [functionName: string]: Coder<unknown> };
  public readonly functions: Record<string, AbiCoderFunction>;
  // { [configurableName: string]: Coder<unknown> };
  private readonly configurable: Record<string, Coder<unknown>> = {};
  // { [logId: string]: Coder<unknown> };
  private readonly logs: Record<string, Coder<unknown>> = {};

  private constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
    this.encoding = EncodingRepository.fromAbi(this.abi);

    this.functions = Object.fromEntries(
      this.abi.functions.map((fn) => [fn.name, this.fromFunction(fn)])
    );

    // this.configurable = Object.fromEntries(
    //   this.abi.configurables.map((configurable) => [
    //     configurable.name,
    //     this.encoding.fromConfigurable(configurable),
    //   ])
    // );
    // this.logs = Object.fromEntries(
    //   this.abi.loggedTypes.map((log) => [log.logId, this.encoding.fromLog(log)])
    // );
  }

  static fromAbi(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }

  private fromFunction(fn: AbiFunction): AbiCoderFunction {
    // Wrap our argument coders in a tuple coder (this is a like for like change with existing functionality)
    // I wonder if it's be better to use a struct coder here
    const argumentsCoders = fn.inputs.map((input) => this.encoding.getCoder(input));
    const argumentsCoder = this.encoding.coders.tuple(argumentsCoders);

    // Get the output coder
    const outputCoder = this.encoding.getCoder({ type: fn.output });

    return {
      name: fn.name,
      arguments: {
        encode: argumentsCoder.encode,
        decode: argumentsCoder.decode,
      },
      output: {
        decode: outputCoder.decode,
      },
    };
  }
}
