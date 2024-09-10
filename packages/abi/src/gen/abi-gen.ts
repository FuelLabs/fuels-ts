import type { Abi } from '../parser';
import type { AbiSpecification } from '../parser/abi-parser';
import { AbiParser } from '../parser/abi-parser';

export class AbiGen {
  private abi: Abi;
  constructor(parsableAbi: AbiSpecification) {
    this.abi = AbiParser.parse(parsableAbi);
  }
}
