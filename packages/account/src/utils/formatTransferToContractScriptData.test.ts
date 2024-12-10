import { BigNumberCoder } from '@fuel-ts/abi-coder';
import { getRandomB256 } from '@fuel-ts/address';
import type { BytesLike } from '@fuel-ts/interfaces';
import { bn, type BigNumberish } from '@fuel-ts/math';
import * as arrayifyMod from '@fuel-ts/utils';

import {
  assembleTransferToContractScript,
  formatTransferToContractScriptData,
} from './formatTransferToContractScriptData';

/**
 * @group node
 */
describe('util', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should ensure "composeScriptForTransferringToContract" returns script just fine', async () => {
    const contractId = '0xf3eb53ed00347d305fc6f6e3a57e91ea6c3182a9efc253488db29494f63c9610';
    const assetId: BytesLike = '0x0f622143ec845f9095bdf02d80273ac48556efcf9f95c1fdadb9351fd8ffcd24';
    const amount: BigNumberish = bn(0);

    const { script, scriptData } = await assembleTransferToContractScript([
      {
        contractId,
        amount,
        assetId,
      },
    ]);

    expect(script).toStrictEqual(
      new Uint8Array([
        97, 64, 0, 10, 80, 69, 0, 0, 80, 73, 16, 32, 93, 77, 32, 0, 80, 81, 32, 8, 60, 69, 53, 0,
        36, 4, 0, 0,
      ])
    );
    expect(scriptData).toStrictEqual(
      new Uint8Array([
        243, 235, 83, 237, 0, 52, 125, 48, 95, 198, 246, 227, 165, 126, 145, 234, 108, 49, 130, 169,
        239, 194, 83, 72, 141, 178, 148, 148, 246, 60, 150, 16, 0, 0, 0, 0, 0, 0, 0, 0, 15, 98, 33,
        67, 236, 132, 95, 144, 149, 189, 240, 45, 128, 39, 58, 196, 133, 86, 239, 207, 159, 149,
        193, 253, 173, 185, 53, 31, 216, 255, 205, 36,
      ])
    );
  });

  it('should ensure "formatScriptDataForTransferringToContract" returns script data just fine', () => {
    const byte: number[] = [0, 0, 0, 0, 0, 0, 0, 1];

    const encode = vi
      .spyOn(BigNumberCoder.prototype, 'encode')
      .mockReturnValue(Uint8Array.from(byte));

    const arrayify = vi.spyOn(arrayifyMod, 'arrayify').mockReturnValue(Uint8Array.from(byte));

    const contractId = getRandomB256();
    const amount: BigNumberish = bn(0);
    const assetId: BytesLike = getRandomB256();

    const scriptData = formatTransferToContractScriptData([
      {
        contractId,
        amount,
        assetId,
      },
    ]);

    expect(scriptData).toStrictEqual(Uint8Array.from([].concat(...Array(3).fill(byte))));

    expect(arrayify).toHaveBeenCalledTimes(2);
    expect(encode).toHaveBeenCalledTimes(1);
  });

  it('should ensure "formatScriptDataForTransferringToContract" returns script data just fine', () => {
    const contractId = '0xf3eb53ed00347d305fc6f6e3a57e91ea6c3182a9efc253488db29494f63c9610';
    const amount: BigNumberish = bn(2).pow(64).sub(1); // Max u64
    const assetId: BytesLike = '0x0f622143ec845f9095bdf02d80273ac48556efcf9f95c1fdadb9351fd8ffcd24';

    const scriptData = formatTransferToContractScriptData([
      {
        contractId,
        amount,
        assetId,
      },
    ]);

    expect(scriptData).toStrictEqual(
      new Uint8Array([
        243, 235, 83, 237, 0, 52, 125, 48, 95, 198, 246, 227, 165, 126, 145, 234, 108, 49, 130, 169,
        239, 194, 83, 72, 141, 178, 148, 148, 246, 60, 150, 16, 255, 255, 255, 255, 255, 255, 255,
        255, 15, 98, 33, 67, 236, 132, 95, 144, 149, 189, 240, 45, 128, 39, 58, 196, 133, 86, 239,
        207, 159, 149, 193, 253, 173, 185, 53, 31, 216, 255, 205, 36,
      ])
    );
  });
});
