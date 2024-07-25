import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../../../test/fixtures/forc-projects/index';
import { makeType } from '../../utils/makeType';
import { supportedTypes } from '../../utils/supportedTypes';
import { ResolvableMetadataType } from '../ResolvableMetadataType';

import { EvmAddressType } from './EvmAddressType';
import { StructType } from './StructType';
import { VectorType } from './VectorType';

/**
 * @group node
 */
describe('EvmAddressType.ts', () => {
  test('should properly parse type attributes', () => {
    const { abiContents } = getTypegenForcProject(AbiTypegenProjectsEnum.EVM_ADDRESS);

    const resolvableMetadataTypes = abiContents.metadataTypes.map(
      (tm) => new ResolvableMetadataType(abiContents, tm.metadataTypeId, undefined)
    );

    const types = resolvableMetadataTypes.map((t) => makeType(supportedTypes, t));

    const suitableForEvmAddress = EvmAddressType.isSuitableFor({ type: EvmAddressType.swayType });
    const suitableForStruct = EvmAddressType.isSuitableFor({ type: StructType.swayType });
    const suitableForVector = EvmAddressType.isSuitableFor({ type: VectorType.swayType });

    expect(suitableForEvmAddress).toEqual(true);
    expect(suitableForStruct).toEqual(false);
    expect(suitableForVector).toEqual(false);

    const evmAddress = types.find((t) => t instanceof EvmAddressType) as EvmAddressType;

    expect(evmAddress.attributes.inputLabel).toEqual('EvmAddress');
    expect(evmAddress.attributes.outputLabel).toEqual('EvmAddress');
    expect(evmAddress.requiredFuelsMembersImports).toStrictEqual(['EvmAddress']);
  });
});
