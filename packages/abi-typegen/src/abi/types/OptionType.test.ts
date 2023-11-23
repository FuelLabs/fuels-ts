import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import type { IRawAbiTypeRoot } from '../../index';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';

import { EnumType } from './EnumType';
import { OptionType } from './OptionType';

describe('OptionType.ts', () => {
  /*
    Test helpers
  */
  function getTypesForContract() {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.OPTION_SIMPLE);
    const rawTypes = project.abiContents.types;

    const types = rawTypes
      .filter((t) => t.type !== '()')
      .map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    return { types };
  }

  test('should properly evaluate type suitability', () => {
    const suitableForOption = OptionType.isSuitableFor({ type: OptionType.swayType });
    const suitableForEnum = OptionType.isSuitableFor({ type: EnumType.swayType });

    expect(suitableForOption).toEqual(true);
    expect(suitableForEnum).toEqual(false);
  });

  test('should properly parse type attributes: simple', () => {
    const { types } = getTypesForContract();

    // validating option
    const b = findType({ types, typeId: 1 }) as OptionType;

    expect(b.attributes.inputLabel).toEqual('Option');
    expect(b.attributes.outputLabel).toEqual('Option');
    expect(b.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
