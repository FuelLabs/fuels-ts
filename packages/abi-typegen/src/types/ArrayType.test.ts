import Sinon, { spy } from 'sinon';
import { ImportMock } from 'ts-mock-imports';

import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('ArrayType.ts', () => {
  beforeEach(ImportMock.restore);
  beforeEach(Sinon.restore);

  test('should properly evaluate type suitability', () => {
    const suitableForTuple = ArrayType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = ArrayType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(false);
    expect(suitableForArray).toEqual(true);
  });

  test('should properly parse type attributes: simple', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.structWithArray;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    // validating `struct B`, with simple tuples on property `x`
    const b = findType({ types, typeId: 0 }) as ArrayType;

    expect(b.attributes.inputLabel).toEqual('[BigNumberish, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[number, number]');

    expect(parseTypeArguments.callCount).toEqual(0); // never called
  });

  test('should properly parse type attributes: nested', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.arrayWithGenerics;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const a = findType({ types, typeId: 1 }) as ArrayType;

    expect(a.attributes.inputLabel).toEqual(
      '[Generic1Input<Generic2Input<BigNumberish>, string>, Generic1Input<Generic2Input<BigNumberish>, string>]'
    );

    expect(a.attributes.outputLabel).toEqual(
      '[Generic1Output<Generic2Output<BN>, string>, Generic1Output<Generic2Output<BN>, string>]'
    );

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
