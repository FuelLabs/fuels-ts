import { spy } from 'sinon';

import { contractPaths } from '../../../test/fixtures';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import { findType } from '../../utils/findType';
import * as parseTypeArgumentsMod from '../helpers/parseTypeArguments';
import { makeType } from '../helpers/types';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('TupleType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.tupleOnly;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayTypeExample });
    const suitableForArrauy = TupleType.isSuitableFor({ type: ArrayType.swayTypeExample });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArrauy).toEqual(false);

    // validating `struct B`, with simple tuples on property `x`
    parseTypeArguments.resetHistory();
    const b = findType({ types, typeId: 0 }) as TupleType;

    expect(b.attributes.inputLabel).toEqual('[boolean, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[boolean, BN]');

    expect(parseTypeArguments.callCount).toEqual(0); // never called

    // validating `struct C`, with nested (tuple) `typeArguments` on `b` property
    parseTypeArguments.resetHistory();
    const c = findType({ types, typeId: 1 }) as TupleType;

    expect(c.attributes.inputLabel).toEqual('[BigNumberish, A<B<BigNumberish>, string>]');
    expect(c.attributes.outputLabel).toEqual('[number, A<B<BN>, string>]');

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
