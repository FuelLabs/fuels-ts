import { contractPaths } from '../../../test/fixtures';
import { compileSwayToJson } from '../../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../../index';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';
import * as parseTypeArgumentsMod from '../../utils/parseTypeArguments';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('TupleType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.tupleSimple;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = TupleType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArray).toEqual(false);

    // validating `struct B`, with simple tuples on property `x`
    parseTypeArguments.mockClear();
    const b = findType({ types, typeId: 0 }) as TupleType;

    expect(b.attributes.inputLabel).toEqual('[boolean, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[boolean, BN]');
    expect(b.requireImportFromFuels).toEqual(false);

    expect(parseTypeArguments).toHaveBeenCalledTimes(0); // never called

    // validating `struct C`, with nested (tuple) `typeArguments` on `b` property
    parseTypeArguments.mockClear();
    const c = findType({ types, typeId: 1 }) as TupleType;

    expect(c.attributes.inputLabel).toEqual(
      '[BigNumberish, StructAInput<StructBInput<BigNumberish>, string>]'
    );
    expect(c.attributes.outputLabel).toEqual('[number, StructAOutput<StructBOutput<BN>, string>]');
    expect(c.requireImportFromFuels).toEqual(false);

    expect(parseTypeArguments).toHaveBeenCalledTimes(2); // called 2x times
  });
});
