import * as asm from '@fuels/vm-asm';

import { InstructionSet } from './instruction-set';

describe('Instruction Set', () => {
  test('Can create asm instruction immediately', () => {
    const movi = asm.movi(0x10, 11);
    expect(movi).toEqual({ __wbg_ptr: 1114136 });
  });

  test('Can create instruction set immediately', () => {
    const instHex = new InstructionSet(
      asm.movi(0x10, 11),
      asm.movi(0x11, 22),
      asm.lw(0x11, 0x11, 0),
      asm.movi(0x12, 33),
      asm.lw(0x12, 0x12, 0),
      asm.movi(0x13, 44),
      asm.call(0x10, 0x12, 0x13, 0x11)
    ).toHex();
    expect(instHex).toEqual('0x7240000b724400165d451000724800215d492000724c002c2d4124d1');
  });
});
