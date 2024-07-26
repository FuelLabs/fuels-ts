import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { makeType } from '../../utils/makeType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableType } from '../ResolvableType';

import { EnumType } from './EnumType';
import { OptionType } from './OptionType';

/**
 * @group node
 */
describe('OptionType.ts', () => {
  /*
    Test helpers
  */
  function getOptionType() {
    const { abiContents } = getTypegenForcProject(AbiTypegenProjectsEnum.OPTION_SIMPLE);

    const resolvableTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableType(abiContents, tm.metadataTypeId, undefined)
    );

    const types = resolvableTypes.map((t) => makeType(supportedTypes, t));

    return types.find((t) => t instanceof OptionType) as OptionType;
  }

  test('should properly evaluate type suitability', () => {
    const suitableForOption = OptionType.isSuitableFor({ type: OptionType.swayType });
    const suitableForEnum = OptionType.isSuitableFor({ type: EnumType.swayType });

    expect(suitableForOption).toEqual(true);
    expect(suitableForEnum).toEqual(false);
  });

  test('should properly parse type attributes: simple', () => {
    const b = getOptionType();

    expect(b.attributes.inputLabel).toEqual('Option<T>');
    expect(b.attributes.outputLabel).toEqual('Option<T>');
    expect(b.requiredFuelsMembersImports).toStrictEqual([]);
  });
});
