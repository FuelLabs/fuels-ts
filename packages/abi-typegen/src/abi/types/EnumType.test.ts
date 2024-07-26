import { AbiTypegenProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import { getType } from '../../../test/utils/getType';
import type { IType } from '../../types/interfaces/IType';

import type { EnumType } from './EnumType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('EnumType.ts', () => {
  function validateCommonEnumAttributes(params: { enum: IType }) {
    expect(params.enum.attributes.inputLabel).toEqual('MyEnumInput');
    expect(params.enum.attributes.outputLabel).toEqual('MyEnumOutput');
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
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_SIMPLE, 'MyEnumInput') as EnumType;
    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.structContents;

    expect(input).toEqual('Checked: string, Pending: string');
    expect(output).toEqual('Checked: string, Pending: string');

    const nativeEnumProps = myEnum.getNativeEnum();
    expect(nativeEnumProps).toEqual(undefined);
  });

  test('should properly parse type attributes for: use native TS enum on a simple enum', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_SIMPLE_NATIVE, 'MyEnumInput') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const nativeEnumProps = myEnum.getNativeEnum();

    expect(nativeEnumProps).toEqual("Checked = 'Checked', Pending = 'Pending'");
  });

  test('should properly parse type attributes for: enums of enums', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_OF_ENUMS, 'MyEnumInput') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.structContents;

    expect(input).toEqual('letter: LetterEnumInput');
    expect(output).toEqual('letter: LetterEnumOutput');
  });

  test('should properly parse type attributes for: enums of structs', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_OF_STRUCTS, 'MyEnumInput') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.structContents;

    expect(input).toEqual('rgb: ColorStructInput');
    expect(output).toEqual('rgb: ColorStructOutput');
  });

  test('should properly parse type attributes for: array of enums', () => {
    const myType = getType(AbiTypegenProjectsEnum.ARRAY_OF_ENUMS, 'MyStructInput') as StructType;

    const { input, output } = myType.structContents;

    expect(input).toEqual('letters: [LettersEnumInput, LettersEnumInput]');
    expect(output).toEqual('letters: [LettersEnumOutput, LettersEnumOutput]');
  });
});
