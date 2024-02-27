import { U64Coder } from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BigNumberish } from '@fuel-ts/math';
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
    const hexlifiedContractId = '0x1234567890123456789012345678901234567890';
    const amountToTransfer: BigNumberish = 0;
    const assetId: BytesLike = BaseAssetId;

    const { script, scriptData } = await assembleTransferToContractScript({
      hexlifiedContractId,
      amountToTransfer,
      assetId,
    });

    expect(script).toStrictEqual(
      new Uint8Array([
        97, 64, 0, 10, 80, 69, 0, 32, 93, 73, 16, 0, 80, 77, 16, 8, 60, 65, 36, 192, 36, 4, 0, 0,
      ])
    );
    expect(scriptData).toStrictEqual(
      new Uint8Array([
        18, 52, 86, 120, 144, 18, 52, 86, 120, 144, 18, 52, 86, 120, 144, 18, 52, 86, 120, 144, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ])
    );
  });

  it('should ensure "formatScriptDataForTransferringToContract" returns script data just fine', () => {
    const byte: number[] = [0, 0, 0, 0, 0, 0, 0, 1];

    const encode = vi.spyOn(U64Coder.prototype, 'encode').mockReturnValue(Uint8Array.from(byte));

    const arrayify = vi.spyOn(arrayifyMod, 'arrayify').mockReturnValue(Uint8Array.from(byte));

    const hexlifiedContractId = '0x1234567890123456789012345678901234567890';
    const amountToTransfer: BigNumberish = 0;
    const assetId: BytesLike = BaseAssetId;

    const scriptData = formatTransferToContractScriptData({
      hexlifiedContractId,
      amountToTransfer,
      assetId,
    });

    expect(scriptData).toStrictEqual(Uint8Array.from([].concat(...Array(3).fill(byte))));

    expect(arrayify).toHaveBeenCalledTimes(2);
    expect(encode).toHaveBeenCalledTimes(1);
  });
});
