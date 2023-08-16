import { getProjectResources, ForcProjectsEnum } from '../../../test/fixtures/forc-projects/index';
import type { IRawAbiTypeRoot } from '../../index';
import { findType } from '../../utils/findType';
import { makeType } from '../../utils/makeType';
import * as parseTypeArgumentsMod from '../../utils/parseTypeArguments';

import { EvmAddressType } from './EvmAddressType';
import { StructType } from './StructType';
import { VectorType } from './VectorType';

describe('EvmAddressType.ts', () => {
  test('should properly parse type attributes', () => {
    const parseTypeArguments = jest.spyOn(parseTypeArgumentsMod, 'parseTypeArguments');

    const project = getProjectResources(ForcProjectsEnum.EVM_ADDRESS);

    const rawTypes = project.abiContents.types;
    const types = rawTypes.map((rawAbiType: IRawAbiTypeRoot) => makeType({ rawAbiType }));

    const suitableForEvmAddress = EvmAddressType.isSuitableFor({ type: EvmAddressType.swayType });
    const suitableForStruct = EvmAddressType.isSuitableFor({ type: StructType.swayType });
    const suitableForVector = EvmAddressType.isSuitableFor({ type: VectorType.swayType });

    expect(suitableForEvmAddress).toEqual(true);
    expect(suitableForStruct).toEqual(false);
    expect(suitableForVector).toEqual(false);

    parseTypeArguments.mockClear();

    const evmAddress = findType({ types, typeId: 1 }) as EvmAddressType;

    expect(evmAddress.attributes.inputLabel).toEqual('EvmAddress');
    expect(evmAddress.attributes.outputLabel).toEqual('EvmAddress');
    expect(evmAddress.requiredFuelsMembersImports).toStrictEqual(['EvmAddress']);
  });
});
