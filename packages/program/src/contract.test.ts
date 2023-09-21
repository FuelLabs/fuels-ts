import type { JsonAbi } from '@fuel-ts/abi-coder';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import { Account, Wallet } from '@fuel-ts/wallet';

import Contract from './contract';

const CONTRACT_ID = '0x0101010101010101010101010101010101010101010101010101010101010101';
const ABI: JsonAbi = {
  types: [
    {
      typeId: 0,
      type: 'u64',
      typeParameters: null,
      components: null,
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
      name: 'foo',
      output: {
        type: 0,
        typeArguments: null,
        name: '',
      },
      attributes: null,
    },
  ],
  loggedTypes: [],
  configurables: [],
};

describe('Contract', () => {
  test('Create contract instance with provider', async () => {
    using provider = await setupTestProvider();
    const contract = new Contract(CONTRACT_ID, ABI, provider);
    expect(contract.provider).toBe(provider);
    expect(contract.account).toBe(null);
  });

  test('Create contract instance with wallet', async () => {
    using provider = await setupTestProvider();
    const wallet = Wallet.generate({
      provider,
    });
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.account).toBe(wallet);
  });

  test('Create contract instance with custom wallet', async () => {
    using provider = await setupTestProvider();
    const generatedWallet = Wallet.generate({
      provider,
    });
    // Create a custom wallet that extends BaseWalletLocked
    // but without reference to the BaseWalletLocked class
    const BaseWalletLockedCustom = Object.assign(Account);
    expect(BaseWalletLockedCustom).not.toBeInstanceOf(Account);
    const wallet = new BaseWalletLockedCustom(generatedWallet.address);
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.account).toBe(wallet);
  });
});
