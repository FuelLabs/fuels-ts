import { concat } from '@fuel-ts/utils';
import type * as asm from '@fuels/vm-asm';
import { hexlify } from '@fuel-ts/utils';

/**
 * A wrapper around fuel-asm to make dynamic instructions and convert to different formats
 */
export class InstructionSet {
  #operations: asm.Instruction[];

  constructor(...args: asm.Instruction[]) {
    this.#operations = args || [];
  }

  entries(): asm.Instruction[] {
    return this.#operations;
  }

  push(...args: asm.Instruction[]) {
    this.#operations.push(...args);
  }

  concat(ops: asm.Instruction[]): asm.Instruction[] {
    return this.#operations.concat(ops);
  }

  extend(ops: asm.Instruction[]) {
    this.#operations.push(...ops);
  }

  toBytes(): Uint8Array {
    return concat(
      this.#operations.reduce((instructions, line) => {
        instructions.push(line.to_bytes());
        return instructions;
      }, [] as Uint8Array[])
    );
  }

  toHex(): string {
    return hexlify(this.toBytes());
  }

  toString() {
    return `Program:\n${JSON.stringify(this.#operations, null, 2)}`;
  }

  byteLength() {
    return this.toBytes().byteLength;
  }
}
