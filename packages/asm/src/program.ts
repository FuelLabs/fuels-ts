import { concat, hexlify } from '@ethersproject/bytes';

import type { Opcode } from './opcode';

export class Program {
  operations: Opcode[];

  constructor(ops?: Opcode[]) {
    this.operations = ops || [];
  }

  push(op: Opcode) {
    this.operations.push(op);
  }

  concat(ops: Opcode[]) {
    this.operations = this.operations.concat(ops);
  }

  toBytes(): Uint8Array {
    return concat(
      this.operations.reduce((instructions, line) => {
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
