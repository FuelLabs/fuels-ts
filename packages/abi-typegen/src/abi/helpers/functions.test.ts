import type { IRawAbiFunction } from '../../interfaces/IRawAbiFunction';
import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import type { IType } from '../../interfaces/IType';

import { makeFunction, parseFunctions } from './functions';
import { makeType } from './types';

describe('functions.ts', () => {
  /*
    Test utility
  */
  function assembleTypesArray() {
    const rawU8: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'u8',
      components: null,
      typeParameters: null,
    };

    const rawU16: IRawAbiTypeRoot = {
      typeId: 2,
      type: 'u16',
      components: null,
      typeParameters: null,
    };

    const typeU8 = makeType({ rawAbiType: rawU8 });
    const typeU16 = makeType({ rawAbiType: rawU16 });

    const types: IType[] = [typeU8, typeU16];

    return types;
  }

  /*
    Method: makeFunction
  */
  test('should create a new Function instance just fine', () => {
    const types = assembleTypesArray();

    const rawAbiFunction: IRawAbiFunction = {
      name: 'f1',
      inputs: [{ name: 'u8', type: 1, typeArguments: null }],
      output: { name: 'u8', type: 1, typeArguments: null },
    };

    expect(makeFunction({ rawAbiFunction, types })).toBeTruthy;
  });

  /*
    Method: makeFunction
  */
  test('should parse an array of raw abi functions', async () => {
    const types = assembleTypesArray();

    const rawF1: IRawAbiFunction = {
      name: 'f1',
      inputs: [{ name: 'u8', type: 1, typeArguments: null }],
      output: { name: 'u8', type: 1, typeArguments: null },
    };

    const rawF2: IRawAbiFunction = {
      name: 'f2',
      inputs: [{ name: 'u16', type: 2, typeArguments: null }],
      output: { name: 'u16', type: 2, typeArguments: null },
    };

    const rawAbiFunctions = [rawF1, rawF2];
    const functions = parseFunctions({ rawAbiFunctions, types });

    expect(functions.length).toEqual(2);
  });
});
