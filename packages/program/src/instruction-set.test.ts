import { InstructionSet } from './instruction-set';

describe('Instruction Set', () => {
  test('Create instruction set immediately', () => {
    const instHex = new InstructionSet(
      asm.movi(0x10, 11),
      asm.movi(0x11, 22),
      asm.lw(0x11, 0x11, 0),
      asm.movi(0x12, 33),
      asm.lw(0x12, 0x12, 0),
      asm.movi(0x13, 44),
      asm.call(0x10, 0x12, 0x13, 0x11)
    ).toHex();
    expect(instHex).toEqual('');
  });
});
