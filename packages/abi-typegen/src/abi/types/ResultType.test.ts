import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { makeType } from '../../utils/makeType';
import { shouldSkipAbiType } from '../../utils/shouldSkipAbiType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableType } from '../ResolvableType';

import { EnumType } from './EnumType';
import { ResultType } from './ResultType';

/**
 * @group node
 */
describe('ResultType.ts', () => {
  /*
    Test helpers
  */
  function getResultType() {
    const { abiContents } = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);

    const resolvableTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableType(abiContents, tm.metadataTypeId, undefined)
    );

    const types = resolvableTypes
      .filter((t) => !shouldSkipAbiType(t))
      .map((t) => makeType(supportedTypes, t));

    return types.find((t) => t instanceof ResultType) as ResultType;
  }

  test('should properly evaluate type suitability', () => {
    const suitableForResult = ResultType.isSuitableFor({ type: ResultType.swayType });
    const suitableForEnum = ResultType.isSuitableFor({ type: EnumType.swayType });

    expect(suitableForResult).toEqual(true);
    expect(suitableForEnum).toEqual(false);
  });

  test('should properly parse type attributes', () => {
    const type = getResultType();

    expect(type.attributes.inputLabel).toEqual('Result');
    expect(type.attributes.outputLabel).toEqual('Result');
    expect(type.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
