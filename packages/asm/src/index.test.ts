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

  // it.skip('can convert program to bytes [withdrawScript]', () => {
  //   /*
  // 	The following code loads some basic values into registers and calls SMO to create an output message
  // 	5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
  // 	5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
  // 	4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
  // 	24000000	- RET                [return 0]
  // 	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
  // 	00000000 00000000 [amount value]
  //   */
  //   const program = [Op.addi(), Op.ret(REG_ZERO)];
  //   const bytes = toBytesFromOpcode(program);

  //   expect(bytes).toEqual('0x5040C0105D44C0064C40001124000000');
  // });
});
