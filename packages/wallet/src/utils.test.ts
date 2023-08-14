import { type BytesLike } from '@ethersproject/bytes';
import * as arrayfyMod from '@ethersproject/bytes';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { BaseAssetId } from '@fuel-ts/address/configs';
import type { BigNumberish } from '@fuel-ts/math';
import * as fuelAsm from '@fuels/vm-asm';

import {
  composeScriptForTransferringToContract,
  formatScriptDataForTransferringToContract,
} from './utils';

jest.mock('@fuels/vm-asm', () => ({
  __esModule: true,
  ...jest.requireActual('@fuels/vm-asm'),
}));

describe('util', () => {
  afterEach(jest.restoreAllMocks);

  it('should ensure "composeScriptForTransferringToContract" returns script just fine', () => {
    const byte: number[] = [0, 0, 0, 0, 0, 0, 0, 1];

    const mockedOpcode = {
      to_bytes: jest.fn().mockReturnValue(byte),
      free(): void {},
    };

    const gtf = jest.spyOn(fuelAsm, 'gtf').mockReturnValue(mockedOpcode);
    const addi = jest.spyOn(fuelAsm, 'addi').mockReturnValue(mockedOpcode);
    const lw = jest.spyOn(fuelAsm, 'lw').mockReturnValue(mockedOpcode);
    const tr = jest.spyOn(fuelAsm, 'tr').mockReturnValue(mockedOpcode);
    const ret = jest.spyOn(fuelAsm, 'ret').mockReturnValue(mockedOpcode);

    const script = composeScriptForTransferringToContract();

    const expectedScript = Uint8Array.from([].concat(...Array(6).fill(byte)));

    expect(script).toStrictEqual(expectedScript);

    expect(gtf).toHaveBeenCalledTimes(1);
    expect(addi).toHaveBeenCalledTimes(2);
    expect(lw).toHaveBeenCalledTimes(1);
    expect(tr).toHaveBeenCalledTimes(1);
    expect(ret).toHaveBeenCalledTimes(1);

    expect(gtf).toHaveBeenCalledWith(0x10, 0x00, 0xc);
    expect(lw).toHaveBeenCalledWith(0x12, 0x11, 0x0);
    expect(tr).toHaveBeenCalledWith(0x10, 0x12, 0x13);
    expect(ret).toHaveBeenCalledWith(0x1);

    expect(addi).toHaveBeenNthCalledWith(1, 0x11, 0x10, 0x20);
    expect(addi).toHaveBeenNthCalledWith(2, 0x13, 0x11, 0x8);

    expect(mockedOpcode.to_bytes).toHaveBeenCalledTimes(6);
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
