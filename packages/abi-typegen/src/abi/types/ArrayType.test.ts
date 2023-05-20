import { ForcProjectsEnum, getProjectResources } from '../../../test/fixtures/forc-projects';
import type { IRawAbiTypeRoot } from '../../types/interfaces/IRawAbiType';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';
import * as parseTypeArgumentsMod from '../../utils/parseTypeArguments';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

describe('ArrayType.ts', () => {
  beforeEach(jest.restoreAllMocks);

  test('should properly evaluate type suitability', () => {
    const suitableForTuple = ArrayType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = ArrayType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(false);
    expect(suitableForArray).toEqual(true);
  });

  test('should properly parse type attributes: simple', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const project = getProjectResources(ForcProjectsEnum.STRUCT_WITH_ARRAY);

    const rawTypes = project.abiContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    // validating `struct B`, with simple tuples on property `x`
    const b = findType({ types, typeId: 0 }) as ArrayType;

    expect(b.attributes.inputLabel).toEqual('[BigNumberish, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[number, number]');
    expect(b.requiredFuelsMembersImports).toStrictEqual([]);

    expect(parseTypeArguments).toHaveBeenCalledTimes(0); // never called
  });

  test('should properly parse type attributes: nested', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const project = getProjectResources(ForcProjectsEnum.ARRAY_WITH_GENERICS);

    const rawTypes = project.abiContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const a = findType({ types, typeId: 1 }) as ArrayType;

    expect(a.attributes.inputLabel).toEqual(
      '[Generic1Input<Generic2Input<BigNumberish>, string>, Generic1Input<Generic2Input<BigNumberish>, string>]'
    );

    expect(a.attributes.outputLabel).toEqual(
      '[Generic1Output<Generic2Output<BN>, string>, Generic1Output<Generic2Output<BN>, string>]'
    );

    expect(parseTypeArguments).toHaveBeenCalledTimes(2); // called 2x times
  });
});
