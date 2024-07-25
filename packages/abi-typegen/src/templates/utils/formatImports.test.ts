import { BoolType } from '../../abi/types/BoolType';
import { U16Type } from '../../abi/types/U16Type';
import { U8Type } from '../../abi/types/U8Type';

import { formatImports } from './formatImports';

/**
 * @group node
 */
describe('formatImports.ts', () => {
  const baseMembers = ['Contract'];

  const u8 = new U8Type({
    type: 'u8',
    components: undefined,
    metadataTypeId: undefined,
    typeParamsArgsMap: undefined,
  });

  const u16 = new U16Type({
    type: 'u16',
    components: undefined,
    metadataTypeId: undefined,
    typeParamsArgsMap: undefined,
  });

  const bool = new BoolType({
    type: 'bool',
    components: undefined,
    metadataTypeId: undefined,
    typeParamsArgsMap: undefined,
  });

  test('should format imports just fine', () => {
    const { imports } = formatImports({ types: [u8, u16, bool] });
    expect(imports).toStrictEqual(['BigNumberish']);
  });

  test('should format imports, preserving base members', () => {
    const { imports } = formatImports({ types: [u8, u16, bool], baseMembers });
    expect(imports).toStrictEqual(['BigNumberish'].concat(baseMembers));
  });

  test('should return undefined when no imports are evaluated', () => {
    const { imports } = formatImports({ types: [bool] });
    expect(imports).toEqual(undefined);
  });

  test('should return only base members, when nothing else is required', () => {
    const { imports } = formatImports({ types: [bool], baseMembers });
    expect(imports).toStrictEqual(baseMembers);
  });
});
