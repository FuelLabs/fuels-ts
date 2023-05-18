import { arrayify } from '@ethersproject/bytes';

import { OpcodeRepr } from './constants';

export class Opcode {
  instruction: number;

  constructor(opcodeAsU32: number) {
    this.instruction = opcodeAsU32;
  }

  toBytes(): Uint8Array {
    return arrayify(this.instruction);
  }

  /// adds two registers.
  static add(RegisterIdA: number, RegisterIdB: number, RegisterIdC: number) {
    let code = OpcodeRepr.ADD;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    let registerC = RegisterIdC;
    registerC <<= 6;

    return new Opcode(code | registerA | registerB | registerC);
  }

  /// adds a register and an immediate value.
  static addi(RegisterIdA: number, RegisterIdB: number, Immediate12: number) {
    let code = OpcodeRepr.ADDI;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    return new Opcode(code | registerA | registerB | Immediate12);
  }

  /// bitwise ands two registers.
  static and() {}

  /// bitwise ands a register and an immediate value.
  static andi() {}

  /// divides two registers.
  static div() {}

  /// divides a register and an immediate value.
  static divi() {}

  /// compares two registers for equality.
  static eq() {}

  /// raises one register to the power of another.
  static exp() {}

  /// raises one register to the power of an immediate value.
  static expi() {}

  /// compares two registers for greater-than.
  static gt() {}

  /// compares two registers for less-than.
  static lt() {}

  /// the integer logarithm of a register.
  static mlog() {}

  /// the integer root of a register.
  static mroo() {}

  /// modulo remainder of two registers.
  static mod() {}

  /// modulo remainder of a register and an immediate value.
  static modi() {}

  /// copy from one register to another.
  static move(RegisterIdA: number, RegisterIdB: number) {
    let code = OpcodeRepr.MOVE;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    return new Opcode(code | registerA | registerB);
  }

  /// copy immediate value into a register
  static movi() {}

  /// multiplies two registers.
  static mul() {}

  /// multiplies a register and an immediate value.
  static muli() {}

  /// bitwise not a register.
  static not() {}

  /// bitwise ors two registers.
  static or() {}

  /// bitwise ors a register and an immediate value.
  static ori() {}

  /// left shifts a register by a register.
  static sll() {}

  /// left shifts a register by an immediate value.
  static slli(RegisterIdA: number, RegisterIdB: number, Immediate12: number) {
    let code = OpcodeRepr.SLLI;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    return new Opcode(code | registerA | registerB | Immediate12);
  }

  /// right shifts a register by a register.
  static srl() {}

  /// right shifts a register by an immediate value.
  static srli() {}

  /// subtracts two registers.
  static sub() {}

  /// subtracts a register and an immediate value.
  static subi() {}

  /// bitwise xors two registers.
  static xor() {}

  /// bitwise xors a register and an immediate value.
  static xori() {}

  /// jump.
  static ji() {}

  /// conditional jump.
  static jnei() {}

  /// conditional jump against zero.
  static jnzi() {}

  /// dynamic jump.
  static jmp() {}

  /// conditional dynamic jump.
  static jne() {}

  /// return from context.
  static ret(RegisterIdA: number) {
    let code = OpcodeRepr.RET;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    return new Opcode(code | registerA);
  }

  /// return from context with data.
  static retd(RegisterIdA: number, RegisterIdB: number) {
    let code = OpcodeRepr.RETD;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    return new Opcode(code | registerA | registerB);
  }

  /// extend the current call frame's stack by an immediate value.
  static cfei() {}

  /// shrink the current call frame's stack by an immediate value.
  static cfsi() {}

  /// a byte is loaded from the specified address offset by an immediate value.
  static lb() {}

  /// a word is loaded from the specified address offset by an immediate value.
  static lw(RegisterIdA: number, RegisterIdB: number, Immediate12: number) {
    let code = OpcodeRepr.LW;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    return new Opcode(code | registerA | registerB | Immediate12);
  }

  /// allocate a number of bytes from the heap.
  static aloc(RegisterIdA: number) {
    let code = OpcodeRepr.ALOC;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    return new Opcode(code | registerA);
  }

  /// clear a variable number of bytes in memory.
  static mcl() {}

  /// clear an immediate number of bytes in memory.
  static mcli() {}

  /// copy a variable number of bytes in memory.
  static mcp() {}

  /// copy an immediate number of bytes in memory.
  static mcpi() {}

  /// compare bytes in memory.
  static meq() {}

  /// write the least significant byte of a register to memory.
  static sb() {}

  /// write a register to memory.
  static sw() {}

  /// get the balance of contract of an asset id.
  static bal() {}

  /// get block header hash for height.
  static bhsh() {}

  /// get current block height.
  static bhei() {}

  /// burn coins of the current contract's asset id.
  static burn() {}

  /// call a contract.
  static call() {}

  /// copy contract code for a contract.
  static ccp() {}

  /// get code root of a contract.
  static croo() {}

  /// get code size of a contract.
  static csiz() {}

  /// get current block proposer's address.
  static cb() {}

  /// load a contract's code as executable.
  static ldc() {}

  /// log an event.
  static log(RegisterIdA: number, RegisterIdB: number, RegisterIdC: number, RegisterIdD: number) {
    let code = OpcodeRepr.LOG;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    let registerC = RegisterIdC;
    registerC <<= 6;

    return new Opcode(code | registerA | registerB | registerC | RegisterIdD);
  }

  /// log data.
  static logd() {}

  /// mint coins of the current contract's asset id.
  static mint() {}

  /// halt execution{} reverting state changes and returning a value.
  static rvrt() {}

  /// send a message to recipient address with call abi{} coins{} and output.
  static smo(RegisterIdA: number, RegisterIdB: number, RegisterIdC: number, RegisterIdD: number) {
    let code = OpcodeRepr.SMO;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    let registerC = RegisterIdC;
    registerC <<= 6;

    return new Opcode(code | registerA | registerB | registerC | RegisterIdD);
  }

  /// clear a series of slots from contract storage.
  static scwq() {}

  /// load a word from contract storage.
  static srw() {}

  /// load a series of 32 byte slots from contract storage.
  static srwq() {}

  /// store a word in contract storage.
  static sww() {}

  /// store a series of 32 byte slots in contract storage.
  static swwq() {}

  /// get timestamp of block at given height.
  static time() {}

  /// transfer coins to a contract unconditionally.
  static tr() {}

  /// transfer coins to a variable output.
  static tro() {}

  /// the 64-byte public key (x{} y) recovered from 64-byte signature on 32-byte message.
  static ecr(RegisterIdA: number, RegisterIdB: number, RegisterIdC: number) {
    let code = OpcodeRepr.ECR;
    code <<= 24;
    let registerA = RegisterIdA;
    registerA <<= 18;
    let registerB = RegisterIdB;
    registerB <<= 12;
    let registerC = RegisterIdC;
    registerC <<= 6;

    return new Opcode(code | registerA | registerB | registerC);
  }

  /// the keccak-256 hash of a slice.
  static k256() {}

  /// the sha-2-256 hash of a slice.
  static s256() {}

  /// performs no operation.
  static noop() {
    let code = OpcodeRepr.NOOP;
    code <<= 24;
    return new Opcode(code);
  }

  /// set flag register to a register.
  static flag() {}

  /// get metadata from memory.
  static gm() {}

  /// get transaction fields.
  static gtf() {}

  /// Undefined opcode, potentially from inconsistent serialization.
  static Undefined() {}
}
