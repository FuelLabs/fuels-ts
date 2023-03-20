import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import type { IRawAbiTypeRoot } from '../../index';
import { TargetEnum } from '../../types/enums/TargetEnum';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';
import * as parseTypeArgumentsMod from '../../utils/parseTypeArguments';

import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('StructType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const project = getProjectResources(ForcProjectsEnum.STRUCT_SIMPLE);

    const rawTypes = project.abiContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayType });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);

    // validating `struct C`, with nested `typeArguments`
    parseTypeArguments.mockClear();
    const c = findType({ types, typeId: 4 }) as StructType;

    expect(c.getStructName()).toEqual('StructC');
    expect(c.getStructDeclaration({ types })).toEqual('');
    expect(c.attributes.structName).toEqual('StructC');
    expect(c.attributes.inputLabel).toEqual('StructCInput');
    expect(c.attributes.outputLabel).toEqual('StructCOutput');
    expect(c.requireImportFromFuels).toEqual(false);

    // inputs and outputs with nested `typeArguments`
    let inputs = c.getStructContents({ types, target: TargetEnum.INPUT });
    expect(inputs).toEqual('propC1: StructAInput<StructBInput<BigNumberish>, BigNumberish>');

    let outputs = c.getStructContents({ types, target: TargetEnum.OUTPUT });
    expect(outputs).toEqual('propC1: StructAOutput<StructBOutput<number>, number>');

    expect(parseTypeArguments).toHaveBeenCalledTimes(2); // called twice

    // validating `struct A`, with multiple `typeParameters` (generics)
    const a = findType({ types, typeId: 2 }) as StructType;
    parseTypeArguments.mockClear();

    expect(a.getStructName()).toEqual('StructA');
    expect(a.getStructDeclaration({ types })).toEqual('<T, U>'); // <— `typeParameters`
    expect(a.attributes.structName).toEqual('StructA');
    expect(a.attributes.inputLabel).toEqual('StructAInput');
    expect(a.attributes.outputLabel).toEqual('StructAOutput');
    expect(a.requireImportFromFuels).toEqual(false);

    inputs = a.getStructContents({ types, target: TargetEnum.INPUT });
    expect(inputs).toEqual('propA1: T, propA2: U');

    outputs = a.getStructContents({ types, target: TargetEnum.OUTPUT });
    expect(outputs).toEqual('propA1: T, propA2: U');

    expect(parseTypeArguments).toHaveBeenCalledTimes(0); // never called
  });
});
