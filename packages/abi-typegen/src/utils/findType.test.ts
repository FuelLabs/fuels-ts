import Sinon from 'sinon';

import { executeAndCatch } from '../../test/utils/executeAndCatch';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';

import { findType } from './findType';
import { makeType } from './types';

describe('findType.ts', () => {
  test('should find type', () => {
    const rawAbiType: IRawAbiTypeRoot = {
      type: 'u8',
      typeId: 1,
      components: null,
      typeParameters: null,
    };

    const type: IType = makeType({ rawAbiType });

    const parseComponentsAttributesSpy = Sinon.spy(type, 'parseComponentsAttributes');

    const typeId = 1;
    const types: IType[] = [type]; // array with type to be found

    const found = findType({ typeId, types });

    expect(found).toBeTruthy;
    expect(parseComponentsAttributesSpy.callCount).toEqual(1);
  });

  test('should throw for type not found', async () => {
    const typeId = 1;
    const types: IType[] = []; // empty array here, will error

    const fn = () => findType({ typeId, types });
    const { error, result } = await executeAndCatch(fn);

    expect(error).toBeTruthy;
    expect(result).toBeFalsy;
  });
});
