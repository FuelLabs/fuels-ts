import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import type { IType } from '../../types/interfaces/IType';
import { makeType } from '../../utils/makeType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableType } from '../ResolvableType';

import { ArrayType } from './ArrayType';
import { TupleType } from './TupleType';

/**
 * @group node
 */
describe('TupleType.ts', () => {
  function getType(project: AbiTypegenProjectsEnum, metadataTypeId: number) {
    const { abiContents } = getTypegenForcProject(project);

    const resolvableTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableType(abiContents, tm.metadataTypeId, undefined)
    );

    const types = resolvableTypes.reduce(
      (obj, val) => ({
        ...obj,
        [val.metadataTypeId]: makeType(supportedTypes, val),
      }),
      {} as Record<number, IType>
    );

    return types[metadataTypeId] as IType;
  }

  test('should properly parse type attributes', () => {
    const b = getType(AbiTypegenProjectsEnum.TUPLE_SIMPLE, 1) as TupleType;

    const suitableForTuple = TupleType.isSuitableFor({ type: TupleType.swayType });
    const suitableForArray = TupleType.isSuitableFor({ type: ArrayType.swayType });

    expect(suitableForTuple).toEqual(true);
    expect(suitableForArray).toEqual(false);

    expect(b.attributes.inputLabel).toEqual('[boolean, BigNumberish]');
    expect(b.attributes.outputLabel).toEqual('[boolean, BN]');
    expect(b.requiredFuelsMembersImports).toStrictEqual([]);

    const c = getType(AbiTypegenProjectsEnum.TUPLE_SIMPLE, 0) as TupleType;

    expect(c.attributes.inputLabel).toEqual(
      '[BigNumberish, StructAInput<StructBInput<BigNumberish>, string>]'
    );
    expect(c.attributes.outputLabel).toEqual('[number, StructAOutput<StructBOutput<BN>, string>]');
    expect(c.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
