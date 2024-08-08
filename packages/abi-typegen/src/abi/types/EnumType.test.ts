import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { TargetEnum } from '../../types/enums/TargetEnum';
import type { JsonAbiType } from '../../types/interfaces/JsonAbi';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';

import type { EnumType } from './EnumType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('EnumType.ts', () => {
  /*
    Test helpers
  */
  function getTypesForContract(project: AbiTypegenProjectsEnum) {
    const {
      abiContents: { types: rawTypes },
    } = getTypegenForcProject(project);

    const types = rawTypes.map((rawAbiType: JsonAbiType) => makeType({ rawAbiType }));

    return { types };
  }

  function validateCommonEnumAttributes(params: { enum: EnumType }) {
    expect(params.enum.attributes.structName).toEqual('MyEnum');
    expect(params.enum.attributes.inputLabel).toEqual('MyEnumInput');
    expect(params.enum.attributes.outputLabel).toEqual('MyEnumOutput');
    expect(params.enum.getStructName()).toEqual('MyEnum');
    expect(params.enum.requiredFuelsMembersImports).toStrictEqual([]);
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
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ENUM_SIMPLE);

    const myEnum = findType({ types, typeId: 1 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('Checked: [], Pending: []');
    expect(outputs).toEqual('Checked: [], Pending: []');
  });

  test('should properly parse type attributes for: use native TS enum on a simple enum', () => {
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ENUM_SIMPLE_NATIVE);

    const myEnum = findType({ types, typeId: 1 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getNativeEnum({ types });
    const outputs = myEnum.getNativeEnum({ types });

    expect(inputs).toEqual("Checked = 'Checked', Pending = 'Pending'");
    expect(outputs).toEqual("Checked = 'Checked', Pending = 'Pending'");
  });

  test('should properly parse type attributes for: use SDK enum on a complex enum', () => {
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ENUM_OF_STRUCTS);

    const myEnum = findType({ types, typeId: 0 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getNativeEnum({ types });
    const outputs = myEnum.getNativeEnum({ types });

    expect(inputs).toEqual(undefined);
    expect(outputs).toEqual(undefined);
  });

  test('should properly parse type attributes for: enums of enums', () => {
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ENUM_OF_ENUMS);

    const myEnum = findType({ types, typeId: 2 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('letter: LetterEnumInput');
    expect(outputs).toEqual('letter: LetterEnumOutput');
  });

  test('should properly parse type attributes for: enums of structs', () => {
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ENUM_OF_STRUCTS);

    const myEnum = findType({ types, typeId: 0 }) as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const inputs = myEnum.getStructContents({ types, target: TargetEnum.INPUT });
    const outputs = myEnum.getStructContents({ types, target: TargetEnum.OUTPUT });

    expect(inputs).toEqual('rgb: ColorStructInput');
    expect(outputs).toEqual('rgb: ColorStructOutput');
  });

  test('should properly parse type attributes for: array of enums', () => {
    const { types } = getTypesForContract(AbiTypegenProjectsEnum.ARRAY_OF_ENUMS);

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
