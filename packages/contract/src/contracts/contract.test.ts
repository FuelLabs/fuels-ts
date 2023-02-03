import { Provider } from '@fuel-ts/providers';
import { BaseWalletLocked, Wallet } from '@fuel-ts/wallet';

import Contract from './contract';
import { MultiCallInvocationScope } from './functions/multicall-scope';

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
  test('Create contract instance with provider', async () => {
    const provider = new Provider('http://localhost:4000/graphql');
    const contract = new Contract(CONTRACT_ID, ABI, provider);
    expect(contract.provider).toBe(provider);
    expect(contract.wallet).toBe(null);
  });

  test('Contract instance with provider can get balance', async () => {
    const provider = new Provider('http://localhost:4000/graphql');
    const contract = new Contract(CONTRACT_ID, ABI, provider);
    await expect(contract.getBalance([1])).resolves.not.toThrow(
      'Contract instance has no provider.'
    );
  });

  test('Create contract instance with wallet', async () => {
    const wallet = Wallet.generate();
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.wallet).toBe(wallet);
  });

  test('Contract instance with wallet can get balance', async () => {
    const wallet = Wallet.generate();
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    await expect(contract.getBalance([1])).resolves.not.toThrow(
      'Contract instance has no provider.'
    );
  });

  test('Contract instance with no provider will throw on get balance', async () => {
    const provider = null;
    const contract = new Contract(CONTRACT_ID, ABI, provider);
    expect(() => contract.getBalance([1])).toThrow('Contract instance has no provider.');
  });

  test('Contract instance ', async () => {
    const wallet = Wallet.generate();
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    const calls = [contract.functions.foo(123)];
    expect(contract.multiCall(calls)).toBeInstanceOf(MultiCallInvocationScope);
  });

  test('Create contract instance with custom wallet', async () => {
    const generatedWallet = Wallet.generate();
    // Create a custom wallet that extends BaseWalletLocked
    // but without reference to the BaseWalletLocked class
    const BaseWalletLockedCustom = Object.assign(BaseWalletLocked);
    expect(BaseWalletLockedCustom).not.toBeInstanceOf(BaseWalletLocked);
    const wallet = new BaseWalletLockedCustom(generatedWallet.address);
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.wallet).toBe(wallet);
  });
});
