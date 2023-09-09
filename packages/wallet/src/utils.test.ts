import { type BytesLike } from '@ethersproject/bytes';
import * as arrayfyMod from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BigNumberish } from '@fuel-ts/math';

import {
  composeScriptForTransferringToContract,
  formatScriptDataForTransferringToContract,
} from './utils';

describe('util', () => {
  afterEach(jest.restoreAllMocks);

  it('should ensure "composeScriptForTransferringToContract" returns script just fine', async () => {
    const script = await composeScriptForTransferringToContract();
    expect(script).toStrictEqual(new Uint8Array([
      97, 64, 0, 12, 80, 69, 0, 32,
      93, 73, 16, 0, 80, 77, 16, 8,
      60, 65, 36, 192, 36, 4, 0, 0
    ]));
  });

  it('should ensure "formatScriptDataForTransferringToContract" returns script data just fine', () => {
    const byte: number[] = [0, 0, 0, 0, 0, 0, 0, 1];

    const encode = jest
      .spyOn(NumberCoder.prototype, 'encode')
      .mockReturnValue(Uint8Array.from(byte));

    const arrayify = jest.spyOn(arrayfyMod, 'arrayify').mockReturnValue(Uint8Array.from(byte));

    const contractId = '0x1234567890123456789012345678901234567890';
    const amountToTransfer: BigNumberish = 0;
    const assetId: BytesLike = BaseAssetId;

    const scriptData = formatScriptDataForTransferringToContract(
      contractId,
      amountToTransfer,
      assetId
    );

    expect(scriptData).toStrictEqual(Uint8Array.from([].concat(...Array(3).fill(byte))));

    expect(arrayify).toHaveBeenCalledTimes(2);
    expect(encode).toHaveBeenCalledTimes(1);
  });
});
