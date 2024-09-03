import type { Abi } from '../parser';
import { parseJsonAbi, type ParsableJsonAbi } from '../parser/abi-parser';

export class AbiCoder {
  private abi: Abi;
  constructor(parsableAbi: ParsableJsonAbi) {
    this.abi = parseJsonAbi(parsableAbi);
  }
}
