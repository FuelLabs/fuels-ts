import { B256Coder, NumberCoder } from '@fuel-ts/abi-coder';
import { arrayify } from '@fuel-ts/utils';

import type { UpgradePurpose } from './upgrade-purpose';
import { UpgradePurposeCoder, UpgradePurposeTypeEnum } from './upgrade-purpose';

/**
 * @group node
 * @group browser
 */
describe('UpgradePurposeCoder', () => {
  const bytecodeRoot = '0x4dd439ec50a1caa950456cefb548043d144681e99361ab9ca6939fc5e466bde0';
  const checksum = '0xc343ed6a0396c31c21bcbd77f24fb0300ab6fcbb177da5cbd0b34c8695e72d2d';
  const witnessIndex = 2;

  it('can encode UpgradePurpose [ConsensusParameters]', () => {
    const upgradePurpose: UpgradePurpose = {
      type: UpgradePurposeTypeEnum.ConsensusParameters,
      data: {
        witnessIndex,
        checksum,
      },
    };

    const typeBytes = [0, 0, 0, 0, 0, 0, 0, UpgradePurposeTypeEnum.ConsensusParameters];
    const witnessIndexBytes = new NumberCoder('u8', { padToWordSize: true }).encode(witnessIndex);
    const checksumBytes = new B256Coder().encode(checksum);

    const expectedEncoded = Uint8Array.from([...typeBytes, ...witnessIndexBytes, ...checksumBytes]);

    const encoded = new UpgradePurposeCoder().encode(upgradePurpose);

    expect(encoded).toStrictEqual(expectedEncoded);
  });

  it('can encode UpgradePurpose [StateTransition]', () => {
    const upgradePurpose: UpgradePurpose = {
      type: UpgradePurposeTypeEnum.StateTransition,
      data: {
        bytecodeRoot,
      },
    };

    const typeBytes = [0, 0, 0, 0, 0, 0, 0, UpgradePurposeTypeEnum.StateTransition];
    const bytecodeRootBytes = new B256Coder().encode(bytecodeRoot);
    const expectedEncoded = Uint8Array.from([...typeBytes, ...bytecodeRootBytes]);

    const encoded = new UpgradePurposeCoder().encode(upgradePurpose);

    expect(encoded).toStrictEqual(expectedEncoded);
  });

  it('can decode UpgradePurpose [ConsensusParameters]', () => {
    const encodedHex =
      '0x00000000000000000000000000000002c343ed6a0396c31c21bcbd77f24fb0300ab6fcbb177da5cbd0b34c8695e72d2d';

    const [upgradePurpose] = new UpgradePurposeCoder().decode(arrayify(encodedHex), 0);

    expect(upgradePurpose).toStrictEqual({
      type: UpgradePurposeTypeEnum.ConsensusParameters,
      data: {
        witnessIndex,
        checksum,
      },
    });
  });

  it('can decode UpgradePurpose [StateTransition]', () => {
    const encodedHex =
      '0x00000000000000014dd439ec50a1caa950456cefb548043d144681e99361ab9ca6939fc5e466bde0';

    const [upgradePurpose] = new UpgradePurposeCoder().decode(arrayify(encodedHex), 0);

    expect(upgradePurpose).toStrictEqual({
      type: UpgradePurposeTypeEnum.StateTransition,
      data: {
        bytecodeRoot,
      },
    });
  });
});
