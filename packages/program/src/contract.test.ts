import { Provider } from '@fuel-ts/providers';
import { Account, Wallet } from '@fuel-ts/wallet';

import Contract from './contract';

const CONTRACT_ID = '0x0101010101010101010101010101010101010101010101010101010101010101';
const ABI = {
  types: [
    {
      typeId: 0,
      type: 'u64',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'input',
          type: 0,
        },
      ],
      name: 'foo',
      output: {
        type: 0,
      },
    },
  ],
  loggedTypes: [],
};

describe('Contract', () => {
  test('Create contract instance with provider', () => {
    const provider = new Provider('http://localhost:4000/graphql');
    const contract = new Contract(CONTRACT_ID, ABI, provider);
    expect(contract.provider).toBe(provider);
    expect(contract.account).toBe(null);
  });

  test('Create contract instance with wallet', () => {
    const wallet = Wallet.generate();
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.account).toBe(wallet);
  });

  test('Create contract instance with custom wallet', () => {
    const generatedWallet = Wallet.generate();
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
