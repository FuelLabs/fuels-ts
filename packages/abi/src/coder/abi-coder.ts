import type { Abi, AbiLoggedType, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

import { AbiEncoding } from './encoding/encoding';
import { ConfigurableRepository } from './functionality/configurable-repository';
import { FunctionRepository } from './functionality/function-repository';

export class AbiCoder {
  // Internal properties
  private abi: Abi;
  private encoding: AbiEncoding;

  // Exposed properties
  public readonly functions: FunctionRepository;
  public readonly configurables: ConfigurableRepository;

  private constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
    this.encoding = AbiEncoding.from(this.abi.encodingVersion);
    this.functions = new FunctionRepository(this.abi.functions, this.encoding);
    this.configurables = new ConfigurableRepository(this.abi.configurables, this.encoding);
  }

  static fromAbi(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }
}
