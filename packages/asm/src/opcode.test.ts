import * as arrayfyMod from '@ethersproject/bytes';

import { OpcodeRepr } from './constants';
import { Opcode } from './opcode';

describe('opcode', () => {
  const getExpectedOpcodeInstruction = (
    opCode: number,
    registers: number[] = [],
    immediates: number[] = []
  ) => {
    let instruction = registers.reduce((acc, register, index) => {
      const expectedRegister = register << (18 - index * 6);
      const expected = acc | expectedRegister;
      return expected;
    }, opCode << 24);

    instruction = immediates.reduce((acc, immediate) => {
      const expected = acc | immediate;
      return expected;
    }, instruction);

    return instruction;
  };

  it('should correctly convert instruction to byte array', () => {
    const instruction = 1234;
    const opcode = new Opcode(instruction);

    const expectedBytes = new Uint8Array(instruction);

    const arrayify = jest.spyOn(arrayfyMod, 'arrayify').mockReturnValue(expectedBytes);

    expect(opcode.toBytes()).toEqual(expectedBytes);

    expect(arrayify).toHaveBeenCalledTimes(1);
    expect(arrayify).toHaveBeenCalledWith(instruction);
  });

  it('should correctly generate the opcode for a "noop" command', () => {
    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.NOOP);

    const opcode = Opcode.noop();

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "ecr" command', () => {
    const registers: [number, number, number] = [10, 20, 30];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.ECR, registers);

    const opcode = Opcode.ecr(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "smo" command', () => {
    const registers: [number, number, number, number] = [1, 5, 10, 20];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.SMO, registers);

    const opcode = Opcode.smo(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "log" command', () => {
    const registers: [number, number, number, number] = [10, 20, 30, 40];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.LOG, registers);

    const opcode = Opcode.log(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "aloc" command', () => {
    const register = 30;

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.ALOC, [register]);

    const opcode = Opcode.aloc(register);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "lw" command', () => {
    const registers: [number, number] = [10, 20];
    const immediates: [number] = [12];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.LW, registers, immediates);

    const opcode = Opcode.lw(...registers, ...immediates);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "retd" command', () => {
    const registers: [number, number] = [15, 30];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.RETD, registers);

    const opcode = Opcode.retd(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "ret" command', () => {
    const register: [number] = [10];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.RET, register);

    const opcode = Opcode.ret(...register);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "slli" command', () => {
    const registers: [number, number] = [15, 30];
    const immediate: [number] = [12];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.SLLI, registers, immediate);

    const opcode = Opcode.slli(...registers, ...immediate);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "move" command', () => {
    const registers: [number, number] = [12, 24];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.MOVE, registers);

    const opcode = Opcode.move(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "addi" command', () => {
    const registers: [number, number] = [12, 24];
    const immediate: [number] = [12];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.ADDI, registers, immediate);

    const opcode = Opcode.addi(...registers, ...immediate);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "add" command', () => {
    const registers: [number, number, number] = [4, 9, 12];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.ADD, registers);

    const opcode = Opcode.add(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "gtf" command', () => {
    const registers: [number, number] = [2, 5];
    const immediate: [number] = [12];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.GTF, registers, immediate);

    const opcode = Opcode.gtf(...registers, ...immediate);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "tr" command', () => {
    const registers: [number, number, number] = [2, 5, 14];

    const expectedValue = getExpectedOpcodeInstruction(OpcodeRepr.TR, registers);

    const opcode = Opcode.tr(...registers);

    expect(opcode.instruction).toBe(expectedValue);
  });
});
