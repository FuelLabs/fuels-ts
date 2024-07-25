import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects';
import { makeType } from '../../utils/makeType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableMetadataType } from '../ResolvableMetadataType';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

/**
 * @group node
 */
describe('ArrayType.ts', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should properly evaluate type suitability', () => {
    const suitableForTuple = ArrayType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = ArrayType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(false);
    expect(suitableForArray).toEqual(true);
  });

  test('should properly parse type attributes: simple', () => {
    const { abiContents } = getTypegenForcProject(AbiTypegenProjectsEnum.STRUCT_WITH_ARRAY);

    const resolvableMetadataTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableMetadataType(abiContents, tm.metadataTypeId, undefined)
    );
    const types = resolvableMetadataTypes.map((t) => makeType(supportedTypes, t));

    // validating `struct B`, with simple tuples on property `x`
    const b = types.find((t) => t instanceof ArrayType) as ArrayType;

    expect(b.attributes.inputLabel).toEqual('[BigNumberish, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[number, number]');
    expect(b.requiredFuelsMembersImports).toStrictEqual([]);
  });

  test('should properly parse type attributes: nested', () => {
    const { abiContents } = getTypegenForcProject(AbiTypegenProjectsEnum.ARRAY_WITH_GENERICS);

    const resolvableMetadataTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableMetadataType(abiContents, tm.metadataTypeId, undefined)
    );
    const types = resolvableMetadataTypes.map((t) => makeType(supportedTypes, t));

    // validating `struct B`, with simple tuples on property `x`
    const a = types.find((t) => t instanceof ArrayType) as ArrayType;

    expect(a.attributes.inputLabel).toEqual(
      '[Generic1Input<Generic2Input<BigNumberish>, string>, Generic1Input<Generic2Input<BigNumberish>, string>]'
    );

    expect(a.attributes.outputLabel).toEqual(
      '[Generic1Output<Generic2Output<BN>, string>, Generic1Output<Generic2Output<BN>, string>]'
    );
  });
});
