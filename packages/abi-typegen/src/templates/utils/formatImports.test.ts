import { BoolType } from '../../abi/types/BoolType';
import { U8Type } from '../../abi/types/U8Type';

import { formatImports } from './formatImports';

/**
 * @group node
 */
describe('formatImports.ts', () => {
  const baseMembers = ['Contract'];

  const u8 = new U8Type({
    rawAbiType: {
      typeId: 1,
      type: 'u8',
      components: null,
      typeParameters: null,
    },
  });

  const u16 = new U8Type({
    rawAbiType: {
      typeId: 2,
      type: 'u16',
      components: null,
      typeParameters: null,
    },
  });

  const bool = new BoolType({
    rawAbiType: {
      typeId: 3,
      type: 'bool',
      components: null,
      typeParameters: null,
    },
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
