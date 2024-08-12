/* eslint-disable @typescript-eslint/no-shadow */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Provider, TESTNET_NETWORK_URL, Wallet, ContractFactory, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoValuesFactory as TypegenFactory, EchoValues } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Deploying Contracts', () => {
  it('gets the max contract size for the chain', async () => {
    using launched = await launchTestNode();

    const { provider: testProvider } = launched;
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
    const TESTNET_NETWORK_URL = testProvider.url;
    const WALLET_PVT_KEY = testWallet.privateKey;
    const bytecode = TypegenFactory.bytecode;

    // #region setup
    // #import { Provider, TESTNET_NETWORK_URL, Wallet };
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import { TypegenFactory } from 'path/to/typegen/outputs';

    const provider = await Provider.create(TESTNET_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
    const factory = new TypegenFactory(wallet);
    // #endregion setup
    expect(hexlify(factory.bytecode)).toBe(hexlify(bytecode));

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
    const { waitForResult: waitForCallResult } = await contract.functions.echo_u8(10).call();
    // Await the result of the call
    const { value } = await waitForCallResult();
    // #endregion call
    expect(value).toBe(10);
  });

  it('deploys a large contract as blobs', async () => {
    using launched = await launchTestNode();

    const {
      provider: testProvider,
      wallets: [testWallet],
    } = launched;
    const TESTNET_NETWORK_URL = testProvider.url;
    const WALLET_PVT_KEY = testWallet.privateKey;
    const abi = EchoValues.abi;
    const bytecode = TypegenFactory.bytecode;

    // #region blobs
    // #import { Provider, TESTNET_NETWORK_URL, Wallet, ContractFactory };
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import { bytecode, abi } from 'path/to/typegen/outputs';

    const provider = await Provider.create(TESTNET_NETWORK_URL);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
    const factory = new ContractFactory(bytecode, abi, wallet);

    // Deploy the contract as blobs
    const { waitForResult, contractId, transactionId } = await factory.deployContractAsBlobs({
      // Increasing chunk size multiplier to be 90% of the max chunk size
      chunkSizeMultiplier: 0.9,
    });
    // Await it's deployment
    const { contract, transactionResult } = await waitForResult();
    // #endregion blobs

    expect(contract).toBeDefined();
    expect(transactionId).toBeDefined();
    expect(transactionResult.status).toBeTruthy();
    expect(contractId).toBe(contract.id.toB256());

    const { waitForResult: waitForCallResult } = await contract.functions.echo_u8(10).call();
    const { value } = await waitForCallResult();
    expect(value).toBe(10);
  });
});
