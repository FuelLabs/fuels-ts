import { Opcode, toBytesFromProgram, toHex, toProgramFromHex, REG_ZERO, REG_ONE } from './index';

describe('asm full tests', () => {
  it('can convert program [NOOP]', () => {
    /*
      Opcode::NOOP
    */
    const program = [Opcode.noop()];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(new Uint8Array([71, 0, 0, 0]));
    expect(hex).toEqual('0x47000000');
  });

  it('can convert hex to program [NOOP]', () => {
    /*
      Opcode::NOOP
    */
    const hex = '0x47000000';
    const program = toProgramFromHex(hex);
    const expected = [Opcode.noop()];

    expect(program).toStrictEqual(expected);
  });

  it('can convert program [RET]', () => {
    /*
      Opcode::RET(REG_ZERO)
    */
    const program = [Opcode.ret(REG_ZERO)];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(new Uint8Array([36, 0, 0, 0]));
    expect(hex).toEqual('0x24000000');
  });

  it('can convert program [returnZeroScript]', () => {
    /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
    const program = [Opcode.ret(REG_ZERO), Opcode.noop()];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(new Uint8Array([36, 0, 0, 0, 71, 0, 0, 0]));
    expect(hex).toEqual('0x2400000047000000');
  });

  it('can convert program [from provider.test]', () => {
    /*
      Opcode::ADDI(0x10, REG_ZERO, 0xCA)
      Opcode::ADDI(0x11, REG_ZERO, 0xBA)
      Opcode::LOG(0x10, 0x11, REG_ZERO, REG_ZERO)
      Opcode::RET(REG_ONE)
    */
    const program = [
      Opcode.addi(0x10, REG_ZERO, 0xca),
      Opcode.addi(0x11, REG_ZERO, 0xba),
      Opcode.log(0x10, 0x11, REG_ZERO, REG_ZERO),
      Opcode.ret(REG_ONE),
    ];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(
      new Uint8Array([80, 64, 0, 202, 80, 68, 0, 186, 51, 65, 16, 0, 36, 4, 0, 0])
    );
    expect(hex).toEqual('0x504000ca504400ba3341100024040000');
  });

  it('can convert program [fuel-asm ecrecover sample]', () => {
    /*
      Opcode::MOVE(0x10, 0x01),      // set r[0x10] := $one
      Opcode::SLLI(0x20, 0x10, 5),   // set r[0x20] := `r[0x10] << 5 == 32`
      Opcode::SLLI(0x21, 0x10, 6),   // set r[0x21] := `r[0x10] << 6 == 64`
      Opcode::ALOC(0x21),            // alloc `r[0x21] == 64` to the heap
      Opcode::ADDI(0x10, 0x07, 1),   // set r[0x10] := `$hp + 1` (allocated heap)
      Opcode::MOVE(0x11, 0x04),      // set r[0x11] := $ssp
      Opcode::ADD(0x12, 0x04, 0x20), // set r[0x12] := `$ssp + r[0x20]`
      Opcode::ECR(0x10, 0x11, 0x12), // recover public key in memory[r[0x10], 64]
      Opcode::RET(0x01),             // return `1`
    */
    const program = [
      Opcode.move(0x10, 0x01),
      Opcode.slli(0x20, 0x10, 5),
      Opcode.slli(0x21, 0x10, 6),
      Opcode.aloc(0x21),
      Opcode.addi(0x10, 0x07, 1),
      Opcode.move(0x11, 0x04),
      Opcode.add(0x12, 0x04, 0x20),
      Opcode.ecr(0x10, 0x11, 0x12),
      Opcode.ret(REG_ONE),
    ];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(
      new Uint8Array([
        26, 64, 16, 0, 87, 129, 0, 5, 87, 133, 0, 6, 38, 132, 0, 0, 80, 64, 112, 1, 26, 68, 64, 0,
        16, 72, 72, 0, 62, 65, 20, 128, 36, 4, 0, 0,
      ])
    );
    expect(hex).toEqual(
      '0x1a401000578100055785000626840000504070011a444000104848003e41148024040000'
    );
  });

  it('can convert program [fuel-asm contract call script]', () => {
    const callDataOffset = 3;
    const gasForwardedOffset = 4;
    const amountOffset = 5;
    const assetIdOffset = 6;
    /*
        MOVI(0x10, call_data_offset),
        MOVI(0x11, gas_forwarded_offset),
        LW(0x11, 0x11, 0),
        MOVI(0x12, amount_offset),
        LW(0x12, 0x12, 0),
        MOVI(0x13, asset_id_offset),
        CALL(0x10, 0x12, 0x13, 0x11),
    */
    const program = [
      Opcode.movi(0x10, callDataOffset),
      Opcode.movi(0x11, gasForwardedOffset),
      Opcode.lw(0x11, 0x11, 0),
      Opcode.movi(0x12, amountOffset),
      Opcode.lw(0x12, 0x12, 0),
      Opcode.movi(0x13, assetIdOffset),
      Opcode.call(0x10, 0x12, 0x13, 0x11),
    ];
    const bytes = toBytesFromProgram(program);
    const hex = toHex(program);

    expect(bytes).toStrictEqual(
      new Uint8Array([
        114, 64, 0, 3, 114, 68, 0, 4, 93, 69, 16, 0, 114, 72, 0, 5, 93, 73, 32, 0, 114, 76, 0, 6,
        45, 65, 36, 209,
      ])
    );
    expect(hex).toEqual('0x72400003724400045d451000724800055d492000724c00062d4124d1');
  });
});
