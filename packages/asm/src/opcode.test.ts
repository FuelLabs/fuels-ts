import * as arrayfyMod from '@ethersproject/bytes';

import { OpcodeRepr } from './constants';
import { Opcode } from './opcode';

describe('opcode', () => {
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
    const expectedValue = OpcodeRepr.NOOP << 24;

    const opcode = Opcode.noop();

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "ecr" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const RegisterIdC = 30;

    const expectedCode = OpcodeRepr.ECR << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedRegisterC = RegisterIdC << 6;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | expectedRegisterC;

    const opcode = Opcode.ecr(registerIdA, registerIdB, RegisterIdC);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "smo" command', () => {
    const registerIdA = 1;
    const registerIdB = 5;
    const RegisterIdC = 10;
    const RegisterIdD = 20;

    const expectedCode = OpcodeRepr.SMO << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedRegisterC = RegisterIdC << 6;
    const expectedRegisterD = RegisterIdD;
    const expectedValue =
      expectedCode | expectedRegisterA | expectedRegisterB | expectedRegisterC | expectedRegisterD;

    const opcode = Opcode.smo(registerIdA, registerIdB, RegisterIdC, RegisterIdD);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "log" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const RegisterIdC = 30;
    const RegisterIdD = 40;

    const expectedCode = OpcodeRepr.LOG << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedRegisterC = RegisterIdC << 6;
    const expectedRegisterD = RegisterIdD;
    const expectedValue =
      expectedCode | expectedRegisterA | expectedRegisterB | expectedRegisterC | expectedRegisterD;

    const opcode = Opcode.log(registerIdA, registerIdB, RegisterIdC, RegisterIdD);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "aloc" command', () => {
    const registerIdA = 10;

    const expectedCode = OpcodeRepr.ALOC << 24;
    const expectedRegisterA = registerIdA << 18;

    const expectedValue = expectedCode | expectedRegisterA;

    const opcode = Opcode.aloc(registerIdA);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "lw" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const immediate12 = 12;

    const expectedCode = OpcodeRepr.LW << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | immediate12;

    const opcode = Opcode.lw(registerIdA, registerIdB, immediate12);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "retd" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;

    const expectedCode = OpcodeRepr.RETD << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB;

    const opcode = Opcode.retd(registerIdA, registerIdB);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "ret" command', () => {
    const registerIdA = 10;

    const expectedCode = OpcodeRepr.RET << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedValue = expectedCode | expectedRegisterA;

    const opcode = Opcode.ret(registerIdA);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "slli" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const immediate12 = 12;

    const expectedCode = OpcodeRepr.SLLI << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | immediate12;

    const opcode = Opcode.slli(registerIdA, registerIdB, immediate12);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "move" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;

    const expectedCode = OpcodeRepr.MOVE << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB;

    const opcode = Opcode.move(registerIdA, registerIdB);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "addi" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const immediate12 = 12;

    const expectedCode = OpcodeRepr.ADDI << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | immediate12;

    const opcode = Opcode.addi(registerIdA, registerIdB, immediate12);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "add" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const RegisterIdC = 30;

    const expectedCode = OpcodeRepr.ADD << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedRegisterC = RegisterIdC << 6;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | expectedRegisterC;

    const opcode = Opcode.add(registerIdA, registerIdB, RegisterIdC);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "gtf" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const immediate12 = 12;

    const expectedCode = OpcodeRepr.GTF << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | immediate12;

    const opcode = Opcode.gtf(registerIdA, registerIdB, immediate12);

    expect(opcode.instruction).toBe(expectedValue);
  });

  it('should correctly generate the opcode for a "tr" command', () => {
    const registerIdA = 10;
    const registerIdB = 20;
    const RegisterIdC = 30;

    const expectedCode = OpcodeRepr.TR << 24;
    const expectedRegisterA = registerIdA << 18;
    const expectedRegisterB = registerIdB << 12;
    const expectedRegisterC = RegisterIdC << 6;
    const expectedValue = expectedCode | expectedRegisterA | expectedRegisterB | expectedRegisterC;

    const opcode = Opcode.tr(registerIdA, registerIdB, RegisterIdC);

    expect(opcode.instruction).toBe(expectedValue);
  });
});
