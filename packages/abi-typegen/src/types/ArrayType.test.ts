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
    const suitableForTuple = ArrayType.isSuitableFor({ type: TupleType.swayTypeExample });
    const suitableForArray = ArrayType.isSuitableFor({ type: ArrayType.swayTypeExample });

    expect(suitableForTuple).toEqual(false);
    expect(suitableForArray).toEqual(true);
  });

  test('should properly parse type attributes: simple', () => {
    const parseTypeArguments = spy(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.arraySimple;
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

    const contractPath = contractPaths.arrayNested;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const a = findType({ types, typeId: 1 }) as ArrayType;

    const expectedInput =
      '[AInput<BInput<BigNumberish>, string>, AInput<BInput<BigNumberish>, string>]';
    expect(a.attributes.inputLabel).toEqual(expectedInput);

    const expectedOutput = '[AOutput<BOutput<BN>, string>, AOutput<BOutput<BN>, string>]';
    expect(a.attributes.outputLabel).toEqual(expectedOutput);

    expect(parseTypeArguments.callCount).toEqual(2); // called 2x times
  });
});
