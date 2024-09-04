import type { Abi, AbiSpecification } from '../parser';
import { AbiParser } from '../parser';

export class AbiCoder {
  private abi: Abi;

  constructor(abi: AbiSpecification) {
    this.abi = AbiParser.parse(abi);
  }

  static fromSpecification(abi: AbiSpecification): AbiCoder {
    return new AbiCoder(abi);
  }
}
