import { U64Coder } from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { BN, type BigNumberish } from '@fuel-ts/math';
import { getBytesCopy, type BytesLike } from 'ethers';

import {
  composeScriptForTransferringToContract,
  formatScriptDataForTransferringToContract,
} from './utils';

/**
 * @group node
 */
describe('util', () => {
  it('should ensure "composeScriptForTransferringToContract" returns script just fine', async () => {
    const script = await composeScriptForTransferringToContract();
    expect(script).toStrictEqual(
      new Uint8Array([
        97, 64, 0, 12, 80, 69, 0, 32, 93, 73, 16, 0, 80, 77, 16, 8, 60, 65, 36, 192, 36, 4, 0, 0,
      ])
    );
  });

  it('should ensure "formatScriptDataForTransferringToContract" returns script data just fine', () => {
    const contractId = '0x1234567890123456789012345678901234567890';
    const amountToTransfer: BigNumberish = 0;
    const assetId: BytesLike = BaseAssetId;

    const scriptData = formatScriptDataForTransferringToContract(
      contractId,
      amountToTransfer,
      assetId
    );

    const expected = Uint8Array.from([
      ...getBytesCopy(contractId),
      ...new U64Coder().encode(new BN(amountToTransfer)),
      ...getBytesCopy(assetId),
    ]);
    expect(scriptData).toStrictEqual(expected);
  });
});
