import { Address } from '@fuel-ts/address';
import { ContractFactory } from '@fuel-ts/contract';
import { Wallet } from '@fuel-ts/wallet';

import { deployContract } from './deployContract';

jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual('fs/promises');
  return {
    ...originalModule,
    readFile: jest.fn().mockReturnValue('0x1111'),
  };
});

describe('Services Fuels', () => {
  it('deployContract should load binary and call deploy with config', async () => {
    const wallet = Wallet.generate();
    const contractId = '0x0000000000000000000000000000000000000000000000000000000000000001';
    const deployContractMock = jest
      .spyOn(ContractFactory.prototype, 'deployContract')
      .mockResolvedValue({
        id: Address.fromB256(contractId),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    const result = await deployContract(wallet, '/root', { gasPrice: 2 });

    expect(deployContractMock).toHaveBeenCalledWith({
      gasPrice: 2,
    });
    expect(result).toEqual(contractId);
  });
});
