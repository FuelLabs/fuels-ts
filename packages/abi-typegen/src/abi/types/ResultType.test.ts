import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import type { JsonAbiType } from '../../index';
import { parseTypes } from '../../utils/parseTypes';

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
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);
    const rawTypes = project.abiContents.types as JsonAbiType[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return parseTypes({ rawAbiTypes: [rawTypes.find((t) => t.type === 'enum Result')!] })[0];
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
