import { spy } from 'sinon';

import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';

import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('StructType.js', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.structSimple;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayType });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayType });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);

    // validating `struct C`, with nested `typeArguments`
    parseTypeArguments.resetHistory();
    const c = findType({ types, typeId: 4 }) as StructType;

    expect(c.getStructName()).toEqual('StructC');
    expect(c.getStructDeclaration({ types })).toEqual('');
    expect(c.attributes.structName).toEqual('StructC');
    expect(c.attributes.inputLabel).toEqual('StructCInput');
    expect(c.attributes.outputLabel).toEqual('StructCOutput');

    // inputs and outputs with nested `typeArguments`
    let inputs = c.getStructContents({ types, target: TargetEnum.INPUT });
    expect(inputs).toEqual('propC1: StructAInput<StructBInput<BigNumberish>, BigNumberish>');

    let outputs = c.getStructContents({ types, target: TargetEnum.OUTPUT });
    expect(outputs).toEqual('propC1: StructAOutput<StructBOutput<number>, number>');

    expect(parseTypeArguments.callCount).toEqual(2); // called twice

    // validating `struct A`, with multiple `typeParameters` (generics)
    const a = findType({ types, typeId: 2 }) as StructType;
    parseTypeArguments.resetHistory();

    expect(a.getStructName()).toEqual('StructA');
    expect(a.getStructDeclaration({ types })).toEqual('<T, U>'); // <— `typeParameters`
    expect(a.attributes.structName).toEqual('StructA');
    expect(a.attributes.inputLabel).toEqual('StructAInput');
    expect(a.attributes.outputLabel).toEqual('StructAOutput');

    inputs = a.getStructContents({ types, target: TargetEnum.INPUT });
    expect(inputs).toEqual('propA1: T, propA2: U');

    outputs = a.getStructContents({ types, target: TargetEnum.OUTPUT });
    expect(outputs).toEqual('propA1: T, propA2: U');

    expect(parseTypeArguments.callCount).toEqual(0); // never called
  });
});
