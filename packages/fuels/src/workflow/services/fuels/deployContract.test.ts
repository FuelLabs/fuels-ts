import { Address } from '@fuel-ts/address';
import { ContractFactory } from '@fuel-ts/contract';
import { Wallet } from '@fuel-ts/wallet';

import { deployContract } from './deployContract';

const mockABI = {
  types: [
    {
      typeId: 0,
      type: 'u64',
      components: null,
      typeParameters: null,
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'input',
          type: 0,
          typeArguments: null,
        },
      ],
      name: 'return_input',
      output: {
        name: '',
        type: 0,
        typeArguments: null,
      },
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};

jest.mock('fs/promises', () => {
  const originalModule = jest.requireActual('fs/promises');

  // if the path ends with '.json', return a json object

  return {
    ...originalModule,
    readFile: (path: string) => {
      if (path.endsWith('.json')) {
        return JSON.stringify(mockABI);
      }
      return '0x1111';
    },
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
    const result = await deployContract(wallet, '/root', 'abi.json', { gasPrice: 2 });

    expect(deployContractMock).toHaveBeenCalledWith({
      gasPrice: 2,
    });
    expect(result).toEqual(contractId);
  });
});
