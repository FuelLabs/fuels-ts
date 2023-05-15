import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { toNumber } from '@fuel-ts/math';

import { Opcode } from './opcode';

type Program = Opcode[];

/// Size of a code when serialized into bytes
const CODE_SIZE = 4;

export const toBytesFromProgram = (program: Program): Uint8Array =>
  concat(
    program.reduce((instructions, line) => {
      instructions.push(line.toBytes());
      return instructions;
    }, [] as Uint8Array[])
  );

export const toHex = (program: Program): string => hexlify(toBytesFromProgram(program));

export const toByteChunksFromHex = (hex: string): Uint8Array[] => {
  const bytes = arrayify(hex);

  const byteChunks = [];
  const LENGTH = bytes.length;
  for (let i = 0; i < LENGTH; i += CODE_SIZE) {
    byteChunks.push(bytes.slice(i, i + CODE_SIZE));
  }

  return byteChunks;
};

export class Instruction {
  instruction: number;
  /// Opcode
  op: number;
  /// Register A
  ra: number;
  /// Register B
  rb: number;
  /// Register C
  rc: number;
  /// Register D
  rd: number;
  /// Immediate with 6 bits
  imm06: number;
  /// Immediate with 12 bits
  imm12: number;
  /// Immediate with 18 bits
  imm18: number;
  /// Immediate with 24 bits
  imm24: number;
  constructor(instruction: number) {
    this.instruction = instruction;
    this.op = instruction >> 24;
    this.ra = (instruction >> 18) & 0x3f;
    this.rb = (instruction >> 12) & 0x3f;
    this.rc = (instruction >> 6) & 0x3f;
    this.rd = instruction & 0x3f;
    this.imm06 = instruction & 0xff;
    this.imm12 = instruction & 0x0fff;
    this.imm18 = instruction & 0x3ffff;
    this.imm24 = instruction & 0xffffff;
  }

  static fromBytes(bytes: Uint8Array) {
    const u32 = toNumber(bytes);
    return new Instruction(u32);
  }

  toOpcode(): Opcode {
    return new Opcode(this.instruction);
  }
}

export const toProgramFromHex = (hex: string): Program =>
  toByteChunksFromHex(hex).map((byteChunk) => Instruction.fromBytes(byteChunk).toOpcode());
