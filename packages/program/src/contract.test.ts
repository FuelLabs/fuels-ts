import type { JsonAbi } from '@fuel-ts/abi-coder';
import { Account, Provider } from '@fuel-ts/account';
import { setupTestProviderAndWallets } from '@fuel-ts/account/test-utils';

import Contract from './contract';
import { getAbisFromAllCalls } from './utils';

const CONTRACT_ID = '0x0101010101010101010101010101010101010101010101010101010101010101';
const ABI: JsonAbi = {
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
  it('preserves the primary contract identity alongside external ABIs', () => {
    const provider = new Provider('http://127.0.0.1:4000/v1/graphql');
    const main = new Contract(CONTRACT_ID, ABI, provider);
    const external = new Contract(`0x${'02'.repeat(32)}`, ABI, provider);
    const abis = getAbisFromAllCalls([main.functions.foo(1), external.functions.foo(2)]);

    expect(abis).toMatchObject({
      mainContractId: main.id.toB256(),
      main: main.interface.jsonAbi,
      otherContractsAbis: { [external.id.toB256()]: external.interface.jsonAbi },
    });
  });

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
