import { spy } from 'sinon';

import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { findType } from '../utils/findType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';
import { makeType } from '../utils/types';

import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('StructType.js', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.structSimple;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForStruct = StructType.isSuitableFor({ type: StructType.swayTypeExample });
    const suitableForU16 = StructType.isSuitableFor({ type: U16Type.swayTypeExample });

    expect(suitableForStruct).toEqual(true);
    expect(suitableForU16).toEqual(false);

    // validating `struct C`, with nested `typeArguments`
    parseTypeArguments.resetHistory();
    const c = findType({ types, typeId: 4 }) as StructType;

    expect(c.getStructName()).toEqual('C');
    expect(c.getStructDeclaration({ types })).toEqual('');
    expect(c.attributes.structName).toEqual('C');
    expect(c.attributes.inputLabel).toEqual('C');
    expect(c.attributes.outputLabel).toEqual('C');
    expect(c.getStructContents({ types })).toEqual('b: A<B<BigNumberish>, BigNumberish>'); // nested `typeArguments`

    expect(parseTypeArguments.callCount).toEqual(1); // called once

    // validating `struct A`, with multiple `typeParameters` (generics)
    const a = findType({ types, typeId: 2 }) as StructType;
    parseTypeArguments.resetHistory();

    expect(a.getStructName()).toEqual('A');
    expect(a.getStructDeclaration({ types })).toEqual('<T, U>'); // <— `typeParameters`
    expect(a.attributes.structName).toEqual('A');
    expect(a.attributes.inputLabel).toEqual('A');
    expect(a.attributes.outputLabel).toEqual('A');
    expect(a.getStructContents({ types })).toEqual('t: T, u: U');

    expect(parseTypeArguments.callCount).toEqual(0); // never called
  });
});
