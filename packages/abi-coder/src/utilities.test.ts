import { concat } from '@ethersproject/bytes';

import { ParamType } from './fragments/param-type';
import type { Uint8ArrayWithVectorData } from './utilities';
import { filterEmptyParams, hasOptionTypes, concatWithVectorData } from './utilities';

describe('Abi Coder Utilities', () => {
  it('can filterEmptyParams', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: '()',
      }),
      new ParamType({
        type: 'enum Option',
      }),
      new ParamType({
        type: '()',
      }),
    ];
    const EXPECTED = [
      new ParamType({
        type: 'enum Option',
      }),
    ];

    const RESULT = filterEmptyParams(INPUT);
    expect(RESULT).toStrictEqual(EXPECTED);
  });

  it('can determine if types array hasOptionTypes [true]', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: 'enum Option',
      }),
    ];

    const RESULT = hasOptionTypes(INPUT);
    expect(RESULT).toStrictEqual(true);
  });

  it('can determine if types array hasOptionTypes [false]', () => {
    const INPUT: ParamType[] = [
      new ParamType({
        type: 'struct Vec',
      }),
    ];

    const RESULT = hasOptionTypes(INPUT);
    expect(RESULT).toStrictEqual(false);
  });

  it('can concatWithVectorData [no vectorData, should match original concat]', () => {
    const data1 = [0, 0, 0, 0, 0, 0, 0, 24];
    const data2 = [0, 0, 0, 0, 0, 0, 0, 4];
    const data3 = [0, 0, 0, 0, 0, 0, 0, 4];
    const data4 = [0, 0, 0, 0, 0, 0, 0, 16];
    const EXPECTED = concat([data1, data2, data3, data4]);

    const RESULT = concatWithVectorData([data1, data2, data3, data4]);
    expect(RESULT).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [relocate single vectorData]', () => {
    const pointer: Uint8ArrayWithVectorData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointer.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = [0, 0, 0, 0, 0, 0, 0, 4];
    const length = [0, 0, 0, 0, 0, 0, 0, 4];
    const someData = [0, 0, 0, 0, 0, 0, 0, 16];
    const EXPECTED: Uint8ArrayWithVectorData = concat([pointer, capacity, length, someData]);
    EXPECTED.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithVectorData([pointer, capacity, length, someData]);
    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithVectorData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [two distinct vectorData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = [0, 0, 0, 0, 0, 0, 0, 4];
    const length = [0, 0, 0, 0, 0, 0, 0, 4];
    const EXPECTED: Uint8ArrayWithVectorData = concat([
      pointer,
      capacity,
      length,
      pointer,
      capacity,
      length,
    ]);
    EXPECTED.vectorData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
    };

    const arrayWithVectorData: Uint8ArrayWithVectorData = concat([pointer, capacity, length]);
    arrayWithVectorData.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithVectorData([arrayWithVectorData, arrayWithVectorData]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithVectorData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [three distinct vectorData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = [0, 0, 0, 0, 0, 0, 0, 4];
    const length = [0, 0, 0, 0, 0, 0, 0, 4];
    const EXPECTED: Uint8ArrayWithVectorData = concat([
      pointer,
      capacity,
      length,
      pointer,
      capacity,
      length,
      pointer,
      capacity,
      length,
    ]);
    EXPECTED.vectorData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]),
    };

    const arrayWithVectorData1: Uint8ArrayWithVectorData = concat([pointer, capacity, length]);
    const arrayWithVectorData2: Uint8ArrayWithVectorData = concat([pointer, capacity, length]);
    const arrayWithVectorData3: Uint8ArrayWithVectorData = concat([pointer, capacity, length]);
    arrayWithVectorData1.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]) };
    arrayWithVectorData2.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]) };
    arrayWithVectorData3.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]) };

    const RESULT = concatWithVectorData([
      arrayWithVectorData1,
      arrayWithVectorData2,
      arrayWithVectorData3,
    ]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithVectorData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [relocate three vectorData]', () => {
    const pointerA: Uint8ArrayWithVectorData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerA.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]) };
    const pointerB: Uint8ArrayWithVectorData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerB.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]) };
    const pointerC: Uint8ArrayWithVectorData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerC.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]) };
    const capacity = [0, 0, 0, 0, 0, 0, 0, 4];
    const length = [0, 0, 0, 0, 0, 0, 0, 4];
    const someData = [0, 0, 0, 0, 0, 0, 0, 16];
    const EXPECTED: Uint8ArrayWithVectorData = concat([
      pointerA,
      capacity,
      length,
      pointerB,
      capacity,
      length,
      pointerC,
      capacity,
      length,
      someData,
    ]);
    EXPECTED.vectorData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
    };

    const RESULT = concatWithVectorData([
      pointerA,
      capacity,
      length,
      pointerB,
      capacity,
      length,
      pointerC,
      capacity,
      length,
      someData,
    ]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithVectorData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [with vectorData in middle, should relocate]', () => {
    const otherData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 9]);
    const pointer: Uint8ArrayWithVectorData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointer.vectorData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = [0, 0, 0, 0, 0, 0, 0, 4];
    const length = [0, 0, 0, 0, 0, 0, 0, 4];
    const data = [0, 0, 0, 0, 0, 0, 0, 16];
    const EXPECTED: Uint8ArrayWithVectorData = concat([otherData, pointer, capacity, length, data]);
    EXPECTED.vectorData = { 2: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithVectorData([otherData, pointer, capacity, length, data]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithVectorData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });
});
