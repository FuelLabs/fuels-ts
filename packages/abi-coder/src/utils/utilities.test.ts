import { concat } from '@fuel-ts/utils';

import type { Uint8ArrayWithDynamicData } from './utilities';
import { concatWithDynamicData, unpackDynamicData } from './utilities';

/**
 * @group node
 * @group browser
 */
describe('Abi Coder Utilities', () => {
  it('can concatWithVectorData [no dynamicData, should match original concat]', () => {
    const data1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const data2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data3 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data4 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const expected = concat([data1, data2, data3, data4]);

    const result = concatWithDynamicData([data1, data2, data3, data4]);
    expect(result).toEqual(expected);
  });

  it('can concatWithVectorData [relocate single dynamicData]', () => {
    const pointer: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    pointer.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const someData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const expected: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
      someData,
    ]);
    expected.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const result = concatWithDynamicData([pointer, capacity, length, someData]);
    expect(result).toEqual(expected);

    // is idempotent
    const resultNew = concatWithDynamicData([result]);
    expect(resultNew).toEqual(expected);
  });

  it('can concatWithVectorData [two distinct dynamicData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const expected: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
      pointer,
      capacity,
      length,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
    };

    const arrayWithVectorData: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
    ]);
    arrayWithVectorData.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
    };

    const result = concatWithDynamicData([
      arrayWithVectorData,
      arrayWithVectorData,
    ]);

    expect(result).toEqual(expected);

    // is idempotent
    const resultNew = concatWithDynamicData([result]);
    expect(resultNew).toEqual(expected);
  });

  it('can concatWithVectorData [three distinct dynamicData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const expected: Uint8ArrayWithDynamicData = concat([
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
    expected.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]),
    };

    const arrayWithVectorData1: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
    ]);
    const arrayWithVectorData2: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
    ]);
    const arrayWithVectorData3: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
    ]);
    arrayWithVectorData1.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
    };
    arrayWithVectorData2.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]),
    };
    arrayWithVectorData3.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]),
    };

    const result = concatWithDynamicData([
      arrayWithVectorData1,
      arrayWithVectorData2,
      arrayWithVectorData3,
    ]);

    expect(result).toEqual(expected);

    // is idempotent
    const resultNew = concatWithDynamicData([result]);
    expect(resultNew).toEqual(expected);
  });

  it('can concatWithVectorData [relocate three dynamicData]', () => {
    const pointerA: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    pointerA.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]) };
    const pointerB: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    pointerB.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]) };
    const pointerC: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    pointerC.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const someData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const expected: Uint8ArrayWithDynamicData = concat([
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
    expected.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
    };

    const result = concatWithDynamicData([
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

    expect(result).toEqual(expected);

    // is idempotent
    const resultNew = concatWithDynamicData([result]);
    expect(resultNew).toEqual(expected);
  });

  it('can concatWithVectorData [with dynamicData in middle, should relocate]', () => {
    const otherData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 9,
    ]);
    const pointer: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    pointer.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const expected: Uint8ArrayWithDynamicData = concat([
      otherData,
      pointer,
      capacity,
      length,
      data,
    ]);
    expected.dynamicData = { 2: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const result = concatWithDynamicData([
      otherData,
      pointer,
      capacity,
      length,
      data,
    ]);

    expect(result).toEqual(expected);

    // is idempotent
    const resultNew = concatWithDynamicData([result]);
    expect(resultNew).toEqual(expected);
  });

  it('can unpackDynamicData [with dynamicData]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    ]);
    const data1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7,
      228, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7,
      227,
    ]);
    const data2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7,
      188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(data1),
      3: new Uint8Array(data2),
    };
    const baseOffset = 0;
    const dataOffset = 0;
    const expected = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      ...data1,
      ...data2,
    ]);

    const result = unpackDynamicData(results, baseOffset, dataOffset);

    expect(result).toEqual(expected);
  });

  it('can unpackDynamicData [with dynamicData before regular data]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    const data1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7,
      228, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7,
      227,
    ]);
    const data2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7,
      188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(data1),
      4: new Uint8Array(data2),
    };
    const baseOffset = 0;
    const dataOffset = 0;
    const expected = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      48,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      ...data1,
      ...data2,
    ]);

    const result = unpackDynamicData(results, baseOffset, dataOffset);

    expect(result).toEqual(expected);
  });

  it('can unpackDynamicData [with dynamicData before regular data, with offset]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    const data1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7,
      228, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7,
      227,
    ]);
    const data2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7,
      188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(data1),
      4: new Uint8Array(data2),
    };
    const baseOffset = 12584;
    const dataOffset = 352;
    const expected = new Uint8Array([
      0,
      0,
      0,
      0,
      0,
      0,
      50,
      136,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      50,
      184,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      ...data1,
      ...data2,
    ]);

    const result = unpackDynamicData(results, baseOffset, dataOffset);

    expect(result).toEqual(expected);
  });
});
