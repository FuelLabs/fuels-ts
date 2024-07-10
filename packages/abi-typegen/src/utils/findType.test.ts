import { safeExec } from '@fuel-ts/errors/test-utils';

import type { IType } from '../types/interfaces/IType';
import type { JsonAbiType } from '../types/interfaces/JsonAbi';

import { findType } from './findType';
import { makeType } from './makeType';

/**
 * @group node
 */
describe('findType.ts', () => {
  test('should find type', () => {
    const rawAbiType: JsonAbiType = {
      type: 'u8',
      typeId: 1,
      components: null,
      typeParameters: null,
    };

    const type: IType = makeType({ rawAbiType });

    const parseComponentsAttributesSpy = vi.spyOn(type, 'parseComponentsAttributes');

    const typeId = 1;
    const types: IType[] = [type]; // array with type to be found

    const found = findType({ typeId, types });

    expect(found).toBeTruthy();
    expect(parseComponentsAttributesSpy).toHaveBeenCalledTimes(1);
  });

  test('should throw for type not found', async () => {
    const typeId = 1;
    const types: IType[] = []; // empty array here, will error

    const fn = () => findType({ typeId, types });
    const { error, result } = await safeExec(fn);

    expect(error).toBeTruthy();
    expect(result).toBeFalsy();
  });
});
