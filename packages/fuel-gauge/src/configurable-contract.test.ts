import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { ContractFactory, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import contractAbi from '../test-projects/configurable-contract/out/debug/configurable-contract-abi.json';

const contractBytecode = readFileSync(
  join(__dirname, '../test-projects/configurable-contract/out/debug/configurable-contract.bin')
);

// TODO: Turn into dictionary
const defaultValues = [
  10,
  true,
  [
    [253, 254],
    [255, 256],
  ],
  'fuel',
  [12, false, 'hi'],
  {
    tag: '000',
    age: 21,
    scores: [1, 3, 4],
  },
];

describe('Configurable Contract', () => {
  let wallet: WalletUnlocked;
  let factory: ContractFactory;

  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: NativeAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);

    factory = new ContractFactory(contractBytecode, contractAbi, wallet);
  });

  it('should assert default values', async () => {
    const contract = await factory.deployContract();

    const { value } = await contract.functions.return_configurables().get();

    expect(value).toStrictEqual(defaultValues);
  });

  it('should set configurable constant before deploy contract (U8)', async () => {
    const configurablesConstants = {
      U8: 99,
    };

    expect(defaultValues[0]).not.toBe(configurablesConstants.U8);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.return_configurables().get();

    expect(value[0]).toBe(configurablesConstants.U8);
  });

  it('should set configurable constant before deploy contract (BOOL)', async () => {
    const configurablesConstants = {
      BOOL: true,
    };

    expect(defaultValues[1]).not.toBe(configurablesConstants.BOOL);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.return_configurables().get();

    expect(value[1]).toBe(configurablesConstants.BOOL);
  });
});
