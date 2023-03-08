import type { IRawAbiFunction } from '../types/interfaces/IRawAbiFunction';
import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';
import type { IType } from '../types/interfaces/IType';

import { makeFunction } from './makeFunction';
import { makeType } from './makeType';

describe('functions.ts', () => {
  test('should instantiate a new Function instance', () => {
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

    const rawAbiFunction: IRawAbiFunction = {
      name: 'f1',
      inputs: [{ name: 'u8', type: 1, typeArguments: null }],
      output: { name: 'u8', type: 1, typeArguments: null },
    };

    expect(makeFunction({ rawAbiFunction, types })).toBeTruthy();
  });
});
