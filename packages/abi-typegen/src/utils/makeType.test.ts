import { safeExec } from '@fuel-ts/errors/test-utils';

import type { ResolvedType } from '../abi/ResolvedType';
import type { IType } from '../types/interfaces/IType';

import { makeType } from './makeType';
import { supportedTypes } from './supportedTypes';

/**
 * @group node
 */
describe('makeType.ts', () => {
  test('should create a new Type instance just fine', () => {
    const type: ResolvedType = {
      type: 'u8',
      metadataTypeId: undefined,
      components: undefined,
      typeParamsArgsMap: undefined,
    };

    expect(makeType(supportedTypes, type)).toBeTruthy();
  });

  test('should throw for unsupported types', async () => {
    const type: ResolvedType = {
      type: 'non-existent',
      metadataTypeId: undefined,
      components: undefined,
      typeParamsArgsMap: undefined,
    };
    const expectedErrorMsg = `Type not supported: ${type.type}`;

    const fn = () => makeType(supportedTypes, type);
    const { error, result } = await safeExec<IType, Error>(fn);

    expect(result).toBeFalsy();
    expect(error?.message).toEqual(expectedErrorMsg);
  });
});
