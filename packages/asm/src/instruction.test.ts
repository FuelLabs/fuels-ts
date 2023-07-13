import {
  Opcode,
  toBytesFromProgram,
  toHex,
  toByteChunksFromHex,
  toProgramFromHex,
  REG_ONE,
} from './index';

describe('instructions', () => {
  it('can convert program to Uint8Array bytes [NOOP]', () => {
    const program = [Opcode.noop()];

    const bytes = toBytesFromProgram(program);

    expect(bytes).toStrictEqual(new Uint8Array([71, 0, 0, 0]));
  });

  it('can convert program to hex string [NOOP]', () => {
    const program = [Opcode.noop()];

    const hex = toHex(program);

    expect(hex).toEqual('0x47000000');
  });

  it('can convert hex string to byte chunks [NOOP]', () => {
    const hex = '0x47000000';

    const byteChunks = toByteChunksFromHex(hex);

    expect(byteChunks).toStrictEqual([new Uint8Array([71, 0, 0, 0])]);
  });

  it('can convert hex string to instruction list [NOOP]', () => {
    const hex = '0x47000000';

    const program = toProgramFromHex(hex);

    expect(program).toStrictEqual([Opcode.noop()]);
  });

  it('can convert hex string to instruction list [fuel-asm ecrecover]', () => {
    const hex = '0x1a401000578100055785000626840000504070011a444000104848003e41148024040000';

    const program = toProgramFromHex(hex);

    expect(program).toStrictEqual([
      Opcode.move(0x10, 0x01),
      Opcode.slli(0x20, 0x10, 5),
      Opcode.slli(0x21, 0x10, 6),
      Opcode.aloc(0x21),
      Opcode.addi(0x10, 0x07, 1),
      Opcode.move(0x11, 0x04),
      Opcode.add(0x12, 0x04, 0x20),
      Opcode.ecr(0x10, 0x11, 0x12),
      Opcode.ret(REG_ONE),
    ]);
  });
});
