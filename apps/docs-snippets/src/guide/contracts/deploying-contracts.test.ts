// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider, TESTNET_NETWORK_URL, Wallet, ContractFactory, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CounterAbi__factory } from '../../../test/typegen';
import bytecode from '../../../test/typegen/contracts/CounterAbi.hex';

describe('Deploying Contracts', () => {
  it('gets the max contract size for the chain', async () => {
    using launched = await launchTestNode();

    const { provider: testProvider } = launched;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const TESTNET_NETWORK_URL = testProvider.url;

    // #region get-contract-max-size
    // #import { Provider, TESTNET_NETWORK_URL };
    const provider = await Provider.create(TESTNET_NETWORK_URL);
    const { consensusParameters } = provider.getChain();
    const contractSizeLimit = consensusParameters.contractParameters.contractMaxSize;
    // #endregion get-contract-max-size
    expect(contractSizeLimit).toBeDefined();
  });

  it('deploys a contract', async () => {
    using launched = await launchTestNode();

    const {
      provider: testProvider,
      wallets: [testWallet],
    } = launched;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const TESTNET_NETWORK_URL = testProvider.url;
    const WALLET_PVT_KEY = testWallet.privateKey;
    const abi = CounterAbi__factory.abi;

    // #region setup
    // #import { Provider, TESTNET_NETWORK_URL, Wallet, ContractFactory };
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import bytecode from 'path/to/typegen/hex/output';
    // #context import { abi } from 'path/to/typegen/outputs';
    const provider = await Provider.create(TESTNET_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
    const factory = new ContractFactory(bytecode, abi, wallet);
    // #endregion setup
    expect(hexlify(factory.bytecode)).toBe(bytecode);

    // #region deploy
    // Deploy the contract
    const { waitForResult, contractId, transactionId } = await factory.deploy();
    // Await it's deployment
    const { contract, transactionResult } = await waitForResult();
    // #endregion deploy
    expect(contract).toBeDefined();
    expect(transactionId).toBeDefined();
    expect(transactionResult.status).toBeTruthy();
    expect(contractId).toBe(contract.id.toB256());

    // #region call
    // Call the contract
    const { waitForResult: waitForCallResult } = await contract.functions.get_count().call();
    // Await the result of the call
    const { value } = await waitForCallResult();
    // #endregion call
    expect(value.toNumber()).toBe(0);
  });
});
