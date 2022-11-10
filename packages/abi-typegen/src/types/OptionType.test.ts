import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';

import { EnumType } from './EnumType';
import { OptionType } from './OptionType';

describe('OptionType.ts', () => {
  /*
    Test helpers
  */
  function getTypesForContract() {
    const contractPath = contractPaths.optionSimple;

    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;

    const types = rawTypes
      .filter((t) => t.type !== '()')
      .map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    return { types };
  }

  test('should properly evaluate type suitability', () => {
    const suitableForOption = OptionType.isSuitableFor({ type: OptionType.swayTypeExample });
    const suitableForEnum = OptionType.isSuitableFor({ type: EnumType.swayTypeExample });

    expect(suitableForOption).toEqual(true);
    expect(suitableForEnum).toEqual(false);
  });

  test('should properly parse type attributes: simple', () => {
    const { types } = getTypesForContract();

    // validating option
    const b = findType({ types, typeId: 1 }) as OptionType;

    expect(b.attributes.inputLabel).toEqual('Option');
    expect(b.attributes.outputLabel).toEqual('Option');
  });
});
