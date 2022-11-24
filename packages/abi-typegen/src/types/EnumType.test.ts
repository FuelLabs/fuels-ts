import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';

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
    expect(params.enum.attributes.structName).toEqual('MyEnum');
    expect(params.enum.attributes.inputLabel).toEqual('MyEnumInput');
    expect(params.enum.attributes.outputLabel).toEqual('MyEnumOutput');
    expect(params.enum.getStructName()).toEqual('MyEnum');
  }

  /*
    Tests
  */
  test('should test type suitability', () => {
    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayType });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);
  });

  test('should properly parse type attributes for: simple enums', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumSimple });

    const myEnum = findType({ types, typeId: 1 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('Checked: [], Pending: []');
    expect(outputs).toEqual('Checked: [], Pending: []');
  });

  test('should properly parse type attributes for: enums of enums', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumOfEnums });

    const myEnum = findType({ types, typeId: 2 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('letter: LetterEnumInput');
    expect(outputs).toEqual('letter: LetterEnumOutput');
  });

  test('should properly parse type attributes for: enums of structs', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.enumOfStructs });

    const myEnum = findType({ types, typeId: 0 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('rgb: ColorStructInput');
    expect(outputs).toEqual('rgb: ColorStructOutput');
  });

  test.only('should properly parse type attributes for: array of enums', () => {
    const { types } = getTypesForContract({ contractPath: contractPaths.arrayOfEnums });

    const myEnum = findType({ types, typeId: 3 }) as EnumType;

    expect(myEnum.attributes.structName).toEqual('MyStruct');
    expect(myEnum.attributes.inputLabel).toEqual('MyStructInput');
    expect(myEnum.attributes.outputLabel).toEqual('MyStructOutput');
    expect(myEnum.getStructName()).toEqual('MyStruct');

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('letters: [LettersEnumInput, LettersEnumInput]');
    expect(outputs).toEqual('letters: [LettersEnumOutput, LettersEnumOutput]');
  });
});
