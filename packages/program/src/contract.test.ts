import type { AbiSpecification } from '@fuel-ts/abi';
import { Account } from '@fuel-ts/account';
import { setupTestProviderAndWallets } from '@fuel-ts/account/test-utils';

import Contract from './contract';

const CONTRACT_ID = '0x0101010101010101010101010101010101010101010101010101010101010101';
const ABI: AbiSpecification = {
  concreteTypes: [
    {
      concreteTypeId: 'asdf',
      type: 'u64',
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: 'input',
          concreteTypeId: 'asdf',
        },
      ],
      name: 'foo',
      output: 'asdf',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
  encodingVersion: '1',
  metadataTypes: [],
  programType: 'contract',
  specVersion: '1',
};

/**
 * @group node
 * @group browser
 */
describe('Contract', () => {
  test('Create contract instance with provider', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const contract = new Contract(CONTRACT_ID, ABI, provider);
    expect(contract.provider).toBe(provider);
    expect(contract.account).toBe(null);
  });

  test('Create contract instance with wallet', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [wallet],
    } = launched;

    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.account).toBe(wallet);
  });

  test('Create contract instance with custom wallet', async () => {
    using launched = await setupTestProviderAndWallets();
    const {
      wallets: [generatedWallet],
    } = launched;

    // Create a custom wallet that extends BaseWalletLocked
    // but without reference to the BaseWalletLocked class
    const BaseWalletLockedCustom = Object.assign(Account);
    expect(BaseWalletLockedCustom).not.toBeInstanceOf(Account);
    const wallet = new BaseWalletLockedCustom(generatedWallet.address, generatedWallet.provider);
    const contract = new Contract(CONTRACT_ID, ABI, wallet);
    expect(contract.provider).toBe(wallet.provider);
    expect(contract.account).toBe(wallet);
  });
});
