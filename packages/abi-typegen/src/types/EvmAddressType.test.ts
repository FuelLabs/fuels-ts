import { contractPaths } from '../../test/fixtures';
import { compileSwayToJson } from '../../test/utils/sway/compileSwayToJson';
import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import { TargetEnum } from '../interfaces/TargetEnum';
import { findType } from '../utils/findType';
import { makeType } from '../utils/makeType';
import * as parseTypeArgumentsMod from '../utils/parseTypeArguments';

import { EvmAddressType } from './EvmAddressType';
import { StructType } from './StructType';
import { U16Type } from './U16Type';

describe('EvmAddressType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const contractPath = contractPaths.evmAddress;
    const rawTypes = compileSwayToJson({ contractPath }).rawContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForEvmAddress = EvmAddressType.isSuitableFor({ type: EvmAddressType.swayType });
    const suitableForU16 = EvmAddressType.isSuitableFor({ type: U16Type.swayType });
    const suitableForStruct = EvmAddressType.isSuitableFor({ type: StructType.swayType });
    const suitableForStructAsStructType = StructType.isSuitableFor({ type: EvmAddressType.swayType});

    expect(suitableForEvmAddress).toEqual(true);
    expect(suitableForU16).toEqual(false);
    // Test to distinguish suitability between the struct and evm address types
    expect(suitableForStruct).toEqual(false);
    expect(suitableForStructAsStructType).toEqual(false);

    parseTypeArguments.mockClear();
    const evm = findType({ types, typeId: 1 }) as EvmAddressType;

    expect(evm.attributes.structName).toEqual('EvmAddress');
    expect(evm.attributes.inputLabel).toEqual('EvmAddressInput');
    expect(evm.attributes.outputLabel).toEqual('EvmAddressOutput');

    const expected = 'value: string';

    const inputs = evm.getStructContents({ types, target: TargetEnum.INPUT});
    expect(inputs).toBe(expected);

    const outputs = evm.getStructContents({ types, target: TargetEnum.OUTPUT});
    expect(outputs).toBe(expected);

    expect(parseTypeArguments).toHaveBeenCalledTimes(0);
  });
});
