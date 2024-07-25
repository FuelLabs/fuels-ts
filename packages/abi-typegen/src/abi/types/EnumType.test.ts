import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import type { IType } from '../../types/interfaces/IType';
import { makeType } from '../../utils/makeType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableMetadataType } from '../ResolvableMetadataType';

import type { EnumType } from './EnumType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('EnumType.ts', () => {
  function getType(project: AbiTypegenProjectsEnum, structName: string) {
    const { abiContents } = getTypegenForcProject(project);

    const resolvableMetadataTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableMetadataType(abiContents, tm.metadataTypeId, undefined)
    );

    const types = resolvableMetadataTypes.map((t) => makeType(supportedTypes, t));

    return types.find((t) => t.attributes.structName === structName) as IType;
  }

  function validateCommonEnumAttributes(params: { enum: IType }) {
    expect(params.enum.attributes.structName).toEqual('MyEnum');
    expect(params.enum.attributes.inputLabel).toEqual('MyEnumInput');
    expect(params.enum.attributes.outputLabel).toEqual('MyEnumOutput');
    expect(params.enum.getStructName?.()).toEqual('MyEnum');
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
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_SIMPLE, 'MyEnum') as EnumType;
    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.getStructContents(supportedTypes);

    expect(input).toEqual('Checked: string, Pending: string');
    expect(output).toEqual('Checked: string, Pending: string');

    const nativeEnumProps = myEnum.getNativeEnum();
    expect(nativeEnumProps).toEqual(undefined);
  });

  test('should properly parse type attributes for: use native TS enum on a simple enum', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_SIMPLE_NATIVE, 'MyEnum') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const nativeEnumProps = myEnum.getNativeEnum();

    expect(nativeEnumProps).toEqual("Checked = 'Checked', Pending = 'Pending'");
  });

  test('should properly parse type attributes for: enums of enums', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_OF_ENUMS, 'MyEnum') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.getStructContents(supportedTypes);

    expect(input).toEqual('letter: LetterEnumInput');
    expect(output).toEqual('letter: LetterEnumOutput');
  });

  test('should properly parse type attributes for: enums of structs', () => {
    const myEnum = getType(AbiTypegenProjectsEnum.ENUM_OF_STRUCTS, 'MyEnum') as EnumType;

    validateCommonEnumAttributes({ enum: myEnum });

    const { input, output } = myEnum.getStructContents(supportedTypes);

    expect(input).toEqual('rgb: ColorStructInput');
    expect(output).toEqual('rgb: ColorStructOutput');
  });

  test('should properly parse type attributes for: array of enums', () => {
    const myType = getType(AbiTypegenProjectsEnum.ARRAY_OF_ENUMS, 'MyStruct') as StructType;

    const { input, output } = myType.getStructContents(supportedTypes);

    expect(input).toEqual('letters: [LettersEnumInput, LettersEnumInput]');
    expect(output).toEqual('letters: [LettersEnumOutput, LettersEnumOutput]');
  });
});
