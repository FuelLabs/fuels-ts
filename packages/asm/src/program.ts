import { concat, hexlify } from '@ethersproject/bytes';

import type { Opcode } from './opcode';

export class Program {
  #operations: Opcode[];

  constructor(ops?: Opcode[]) {
    this.#operations = ops || [];
  }

  entries(): Opcode[] {
    return structuredClone(this.#operations);
  }

  push(...args: Opcode[]) {
    this.#operations.push(...args);
  }

  concat(ops: Opcode[]): Opcode[] {
    return this.#operations.concat(ops);
  }

  extend(ops: Opcode[]) {
    this.#operations.push(...ops);
  }

  toBytes(): Uint8Array {
    return concat(
      this.#operations.reduce((instructions, line) => {
        instructions.push(line.toBytes());
        return instructions;
      }, [] as Uint8Array[])
    );
  }

  toHex(): string {
    return hexlify(this.toBytes());
  }

  static fromHex(_hex: string): Program {
    return new Program();
  }

  static fromBytes(_bytes: Uint8Array): Program {
    return new Program();
  }
}
