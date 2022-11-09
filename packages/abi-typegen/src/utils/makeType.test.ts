import { executeAndCatch } from '../../test/utils/executeAndCatch';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';

import { makeType } from './makeType';

describe('makeType.ts', () => {
  test('should create a new Type instance just fine', () => {
    const rawAbiType: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'u64',
      components: null,
      typeParameters: null,
    };

    expect(makeType({ rawAbiType })).toBeTruthy;
  });

  test('should throw for unsupported types', async () => {
    const rawAbiType: IRawAbiTypeRoot = {
      typeId: 1,
      type: 'non existent',
      components: null,
      typeParameters: null,
    };

    const expectedErrorMsg = `Type not supported: ${rawAbiType.type}`;

    const fn = () => makeType({ rawAbiType });
    const { error, result } = await executeAndCatch<Error>(fn);

    expect(result).toBeFalsy;
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
