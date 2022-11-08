import { spy } from 'sinon';

import { contractPaths } from '../../../test/fixtures';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../../interfaces/IRawAbiType';
import { findType } from '../../utils/findType';
import * as parseTypeArgumentsMod from '../helpers/parseTypeArguments';
import { makeType } from '../helpers/types';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('ArrayType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.arrayOnly;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForTuple = ArrayType.isSuitableFor({ type: TupleType.swayTypeExample });
    const suitableForArray = ArrayType.isSuitableFor({ type: ArrayType.swayTypeExample });

    expect(suitableForTuple).toEqual(false);
    expect(suitableForArray).toEqual(true);

    // validating `struct B`, with simple tuples on property `x`
    parseTypeArguments.resetHistory();
    const b = findType({ types, typeId: 0 }) as ArrayType;

    expect(b.attributes.inputLabel).toEqual('[boolean, boolean]');
    expect(b.attributes.outputLabel).toEqual('[boolean, boolean]');

    expect(parseTypeArguments.callCount).toEqual(0); // never called

    // validating `struct C`, with nested (tuple) `typeArguments` on `b` property
    parseTypeArguments.resetHistory();
    const c = findType({ types, typeId: 1 }) as ArrayType;

    const { inputLabel, outputLabel } = c.attributes;

    expect(inputLabel).toEqual('[A<B<BigNumberish>, string>, A<B<BigNumberish>, string>]');
    expect(outputLabel).toEqual('[A<B<BN>, string>, A<B<BN>, string>]');

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
