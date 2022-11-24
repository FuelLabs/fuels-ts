import { spy } from 'sinon';

import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('TupleType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.tupleSimple;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = TupleType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArray).toEqual(false);

    // validating `struct B`, with simple tuples on property `x`
    parseTypeArguments.resetHistory();
    const b = findType({ types, typeId: 0 }) as TupleType;

    expect(b.attributes.inputLabel).toEqual('[boolean, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[boolean, BN]');

    expect(parseTypeArguments.callCount).toEqual(0); // never called

    // validating `struct C`, with nested (tuple) `typeArguments` on `b` property
    parseTypeArguments.resetHistory();
    const c = findType({ types, typeId: 1 }) as TupleType;

    expect(c.attributes.inputLabel).toEqual(
      '[BigNumberish, StructAInput<StructBInput<BigNumberish>, string>]'
    );
    expect(c.attributes.outputLabel).toEqual('[number, StructAOutput<StructBOutput<BN>, string>]');

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
