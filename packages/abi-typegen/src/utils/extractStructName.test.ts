import type { ResolvedType } from '../abi/ResolvedType';
import { EnumType } from '../abi/types/EnumType';
import { GenericType } from '../abi/types/GenericType';
import { StructType } from '../abi/types/StructType';

import { extractStructName } from './extractStructName';

/**
 * @group node
 */
describe('extractStructName.ts', () => {
  /*
    Test helpers
  */
  function makeType(type: string): ResolvedType {
    return {
      type,
      metadataTypeId: undefined,
      components: undefined,
      typeParamsArgsMap: undefined,
    };
  }

  /*
    Tests
  */
  test('should extract names from Enum', () => {
    const enumType = makeType('enum MyEnumName');

    expect(
      extractStructName({
        type: enumType,
        regex: EnumType.MATCH_REGEX,
      })
    ).toEqual('MyEnumName');
  });

  test('should extract names from Structs', () => {
    const struct = makeType('struct MyStructName');

    expect(
      extractStructName({
        type: struct,
        regex: StructType.MATCH_REGEX,
      })
    ).toEqual('MyStructName');
  });

  test('should extract names from Generics', () => {
    const generic = makeType('generic MyGenericName');

    expect(
      extractStructName({
        type: generic,
        regex: GenericType.MATCH_REGEX,
      })
    ).toEqual('MyGenericName');
  });

  test('should throw when trying to extract type', () => {
    const badType = makeType('struct');

    expect(() => {
      extractStructName({ type: badType, regex: StructType.MATCH_REGEX });
    }).toThrow(/Couldn't extract struct name with:/);
  });
});
