import { AbiTypegenProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import { getType } from '../../../test/utils/getType';

import { BytesType } from './BytesType';
import { EvmAddressType } from './EvmAddressType';
import { StdStringType } from './StdStringType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

/**
 * @group node
 */
describe('StructType.ts', () => {
  test('should properly parse type attributes', () => {
    const c = getType(AbiTypegenProjectsEnum.STRUCT_SIMPLE, 'StructCInput') as StructType;

    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayType });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayType });
    const suitableForEvmAddress = StructType.isSuitableFor({ type: EvmAddressType.swayType });
    const suitableForBytes = StructType.isSuitableFor({ type: BytesType.swayType });
    const suitableForStdString = StructType.isSuitableFor({ type: StdStringType.swayType });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);
    expect(suitableForEvmAddress).toEqual(false);
    expect(suitableForBytes).toEqual(false);
    expect(suitableForStdString).toEqual(false);

    expect(c.attributes.inputLabel).toEqual('StructCInput');
    expect(c.attributes.outputLabel).toEqual('StructCOutput');
    expect(c.requiredFuelsMembersImports).toStrictEqual([]);

    // inputs and outputs with nested `typeArguments`
    const { input: CInput, output: COutput } = c.structContents;

    expect(CInput).toEqual('propC1: StructAInput<StructBInput<BigNumberish>, BigNumberish>');
    expect(COutput).toEqual('propC1: StructAOutput<StructBOutput<number>, number>');

    // validating `struct A`, with multiple `typeParameters` (generics)
    const a = getType(AbiTypegenProjectsEnum.STRUCT_SIMPLE, 'StructAInput<T, U>') as StructType;

    expect(a.attributes.inputLabel).toEqual('StructAInput<T, U>');
    expect(a.attributes.outputLabel).toEqual('StructAOutput<T, U>');
    expect(a.requiredFuelsMembersImports).toStrictEqual([]);

    const { input: AInput, output: AOutput } = a.structContents;

    expect(AInput).toEqual('propA1: T, propA2: U');
    expect(AOutput).toEqual('propA1: T, propA2: U');
  });
});
