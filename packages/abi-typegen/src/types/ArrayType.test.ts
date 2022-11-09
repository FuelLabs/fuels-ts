import { spy } from 'sinon';

import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('ArrayType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.arraySimple;
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

    parseTypeArguments.resetHistory();
    const a = findType({ types, typeId: 1 }) as ArrayType;

    const expectedInput =
      '[AInput<BInput<BigNumberish>, string>, AInput<BInput<BigNumberish>, string>]';
    expect(a.attributes.inputLabel).toEqual(expectedInput);

    const expectedOutput = '[AOutput<BOutput<BN>, string>, AOutput<BOutput<BN>, string>]';
    expect(a.attributes.outputLabel).toEqual(expectedOutput);

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
