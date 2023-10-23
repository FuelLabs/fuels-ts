import { concat } from '@fuel-ts/utils';

import type { Uint8ArrayWithDynamicData } from './utilities';
import { unpackDynamicData, concatWithDynamicData } from './utilities';

/**
 * @group node
 */
describe('Abi Coder Utilities', () => {
  it('can concatWithVectorData [no dynamicData, should match original concat]', () => {
    const data1 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const data2 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data3 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data4 = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const EXPECTED = concat([data1, data2, data3, data4]);

    const RESULT = concatWithDynamicData([data1, data2, data3, data4]);
    expect(RESULT).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [relocate single dynamicData]', () => {
    const pointer: Uint8ArrayWithDynamicData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointer.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const someData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const EXPECTED: Uint8ArrayWithDynamicData = concat([pointer, capacity, length, someData]);
    EXPECTED.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithDynamicData([pointer, capacity, length, someData]);
    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithDynamicData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [two distinct dynamicData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const EXPECTED: Uint8ArrayWithDynamicData = concat([
      pointer,
      capacity,
      length,
      pointer,
      capacity,
      length,
    ]);
    EXPECTED.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]),
    };

    const arrayWithVectorData: Uint8ArrayWithDynamicData = concat([pointer, capacity, length]);
    arrayWithVectorData.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithDynamicData([arrayWithVectorData, arrayWithVectorData]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithDynamicData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [three distinct dynamicData]', () => {
    const pointer = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const EXPECTED: Uint8ArrayWithDynamicData = concat([
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
    EXPECTED.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]),
    };

    const arrayWithVectorData1: Uint8ArrayWithDynamicData = concat([pointer, capacity, length]);
    const arrayWithVectorData2: Uint8ArrayWithDynamicData = concat([pointer, capacity, length]);
    const arrayWithVectorData3: Uint8ArrayWithDynamicData = concat([pointer, capacity, length]);
    arrayWithVectorData1.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]) };
    arrayWithVectorData2.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 35]) };
    arrayWithVectorData3.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 37]) };

    const RESULT = concatWithDynamicData([
      arrayWithVectorData1,
      arrayWithVectorData2,
      arrayWithVectorData3,
    ]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithDynamicData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [relocate three dynamicData]', () => {
    const pointerA: Uint8ArrayWithDynamicData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerA.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]) };
    const pointerB: Uint8ArrayWithDynamicData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerB.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]) };
    const pointerC: Uint8ArrayWithDynamicData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointerC.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const someData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const EXPECTED: Uint8ArrayWithDynamicData = concat([
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
    EXPECTED.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 33]),
      3: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 12]),
      6: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]),
    };

    const RESULT = concatWithDynamicData([
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
    const RESULT_NEW = concatWithDynamicData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can concatWithVectorData [with dynamicData in middle, should relocate]', () => {
    const otherData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 9]);
    const pointer: Uint8ArrayWithDynamicData = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 24]);
    pointer.dynamicData = { 0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };
    const capacity = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const length = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4]);
    const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 16]);
    const EXPECTED: Uint8ArrayWithDynamicData = concat([
      otherData,
      pointer,
      capacity,
      length,
      data,
    ]);
    EXPECTED.dynamicData = { 2: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 36]) };

    const RESULT = concatWithDynamicData([otherData, pointer, capacity, length, data]);

    expect(RESULT).toEqual(EXPECTED);

    // is idempotent
    const RESULT_NEW = concatWithDynamicData([RESULT]);
    expect(RESULT_NEW).toEqual(EXPECTED);
  });

  it('can unpackDynamicData [with dynamicData]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
      24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    ]);
    const DATA_1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7, 228, 0, 0, 0, 0, 0, 0,
      0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 227,
    ]);
    const DATA_2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7, 188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(DATA_1),
      3: new Uint8Array(DATA_2),
    };
    const BASE_OFFSET = 0;
    const DATA_OFFSET = 0;
    // prettier-ignore
    const EXPECTED = new Uint8Array([
      0,       0,       0,       0,       0,       0,       0,       0,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       48,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       1,
      ...DATA_1,
      ...DATA_2,
    ]);

    const RESULT = unpackDynamicData(results, BASE_OFFSET, DATA_OFFSET);

    expect(RESULT).toEqual(EXPECTED);
  });

  it('can unpackDynamicData [with dynamicData before regular data]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 2,
    ]);
    const DATA_1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7, 228, 0, 0, 0, 0, 0, 0,
      0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 227,
    ]);
    const DATA_2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7, 188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(DATA_1),
      4: new Uint8Array(DATA_2),
    };
    const BASE_OFFSET = 0;
    const DATA_OFFSET = 0;
    // prettier-ignore
    const EXPECTED = new Uint8Array([
      0,       0,       0,       0,       0,       0,       0,       0,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       48,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       2,
      ...DATA_1,
      ...DATA_2,
    ]);

    const RESULT = unpackDynamicData(results, BASE_OFFSET, DATA_OFFSET);

    expect(RESULT).toEqual(EXPECTED);
  });

  it('can unpackDynamicData [with dynamicData before regular data, with offset]', () => {
    const results: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
      1, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
      0, 2,
    ]);
    const DATA_1 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 7, 228, 0, 0, 0, 0, 0, 0,
      0, 12, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 227,
    ]);
    const DATA_2 = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 7, 188,
    ]);
    results.dynamicData = {
      0: new Uint8Array(DATA_1),
      4: new Uint8Array(DATA_2),
    };
    const BASE_OFFSET = 12584;
    const DATA_OFFSET = 352;
    // prettier-ignore
    const EXPECTED = new Uint8Array([
      0,       0,       0,       0,       0,       0,       50,      136,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       2,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       50,      184,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       1,
      0,       0,       0,       0,       0,       0,       0,       2,
      ...DATA_1,
      ...DATA_2,
    ]);

    const RESULT = unpackDynamicData(results, BASE_OFFSET, DATA_OFFSET);

    expect(RESULT).toEqual(EXPECTED);
  });
});
