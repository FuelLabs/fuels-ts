import { contractPaths } from '../../../test/fixtures';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import { findType } from '../../utils/findType';
import { makeType } from '../helpers/types';

import type { EnumType } from './EnumType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('EnumType.ts', () => {
  /*
    Test helpers
  */
  function getTypesForContract(params: { contractPath: string }) {
    const { contractPath } = params;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes
      .filter((t) => t.type !== '()')
      .map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));
    return { types };
  }

  function validateCommonEnumAttributes(params: { enum: EnumType }) {
    expect(params.enum.attributes.enumName).toEqual('MyEnum');
    expect(params.enum.attributes.inputLabel).toEqual('MyEnum');
    expect(params.enum.attributes.outputLabel).toEqual('MyEnum');
    expect(params.enum.getEnumName()).toEqual('MyEnum');
  }

  /*
    Tests
  */
  test('should test type suitability', () => {
    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayTypeExample });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayTypeExample });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);
  });

  test('should properly parse type attributes for: simple enums', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumOnly });

    const myEnum = findType({ types, typeId: 1 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });
    expect(myEnum.getEnumContents({ types })).toEqual('Checked: [], Pending: []');
  });

  test('should properly parse type attributes for: enums of enums', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumsOfEnums });

    const myEnum = findType({ types, typeId: 2 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });
    expect(myEnum.getEnumContents({ types })).toEqual('letter: LetterEnum');
  });

  test('should properly parse type attributes for: enums of structs', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumsOfStructs });

    const myEnum = findType({ types, typeId: 0 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });
    expect(myEnum.getEnumContents({ types })).toEqual('color: ColorStruct');
  });
});
