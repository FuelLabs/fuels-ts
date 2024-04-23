import { seedTestWallet } from '@fuel-ts/account/test-utils';
import type { Account, Coin, Resource } from 'fuels';
import {
  CreateTransactionRequest,
  ScriptTransactionRequest,
  arrayify,
  ZeroBytes32,
  Address,
  BaseAssetId,
  bn,
  Predicate,
  Provider,
  FUEL_NETWORK_URL,
  WalletUnlocked,
} from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe('Transaction Request', () => {
  let provider: Provider;

  const { abiContents: scriptAbi, binHexlified: scriptBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  const { abiContents: predicateAbi, binHexlified: predicateBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SIMPLE_PREDICATE
  );

  const address = Address.fromRandom();

  const message = {
    assetId: BaseAssetId,
    sender: address,
    recipient: address,
    nonce: '0x',
    amount: bn(0),
    daHeight: bn(0),
  };
  const coin: Coin = {
    id: '0x',
    assetId: BaseAssetId,
    amount: bn(0),
    owner: address,
    blockCreated: bn(0),
    txCreatedIdx: bn(0),
  };

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);

    const predicate = new Predicate({
      bytecode: predicateBytecode,
      abi: predicateAbi,
      inputData: [ZeroBytes32],
      provider,
    });

    await seedTestWallet(predicate, [[10_000]]);
  });

  it('creates a transaction request from ScriptTransactionRequest', () => {
    const scriptMainFunctionArguments = [1];

    // #region transaction-request-1
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request using a ScriptTransactionRequest
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Set the script main function arguments (can also be passed in the class constructor)
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);
    // #endregion transaction-request-1

    expect(transactionRequest.script).toEqual(arrayify(scriptBytecode));
  });

  it('creates a transaction request fromm a CreateTransactionRequest', () => {
    const contractByteCode = ZeroBytes32;

    // #region transaction-request-2
    // #import { CreateTransactionRequest };

    // Instantiate the transaction request using a CreateTransactionRequest
    const transactionRequest = new CreateTransactionRequest({ witnesses: [contractByteCode] });
    // #endregion transaction-request-2

    expect(transactionRequest.witnesses[0]).toEqual(contractByteCode);
  });

  it('modifies a transaction request', () => {
    const recipientAddress = address;
    const resource = coin;
    const resources: Resource[] = [resource];

    // #region transaction-request-3
    // #import { ScriptTransactionRequest, BaseAssetId };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Adding resources (coins or messages)
    transactionRequest.addResources(resources);
    transactionRequest.addResource(resource);

    // Adding coin inputs and outputs (including transfer to recipient)
    transactionRequest.addCoinInput(coin);
    transactionRequest.addCoinOutput(recipientAddress, 1000, BaseAssetId);

    // Adding message inputs
    transactionRequest.addMessageInput(message);
    // #endregion transaction-request-3

    expect(transactionRequest.script).toEqual(arrayify(scriptBytecode));
    expect(transactionRequest.inputs.length).toEqual(4);
    expect(transactionRequest.outputs.length).toEqual(2);
    expect(transactionRequest.witnesses.length).toEqual(1);
  });

  it('adds a contract to a transaction request', () => {
    const contractId = Address.fromRandom();

    // #region transaction-request-4
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Add the contract input and output using the contract ID
    transactionRequest.addContractInputAndOutput(contractId);
    // #endregion transaction-request-4

    expect(transactionRequest.inputs.length).toEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('adds a predicate to a transaction request', async () => {
    const dataToValidatePredicate = [ZeroBytes32];

    // #region transaction-request-5
    // #import { ScriptTransactionRequest, Predicate };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Instantiate the predicate and pass valid input data to validate
    // the predicate and unlock the funds
    const predicate = new Predicate({
      bytecode: predicateBytecode,
      abi: predicateAbi,
      inputData: dataToValidatePredicate,
      provider,
    });

    const predicateCoins = await predicate.getResourcesToSpend([
      { amount: 1000, assetId: BaseAssetId },
    ]);

    // Add the predicate input and resources
    transactionRequest.addResources(predicateCoins);
    // #endregion transaction-request-5

    expect(transactionRequest.inputs.length).toEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('adds a witness to a transaction request', async () => {
    const witness = ZeroBytes32;

    // #region transaction-request-6
    // #import { ScriptTransactionRequest, Account, WalletUnlocked };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Add a witness directly
    transactionRequest.addWitness(witness);

    // Add a witness using an account
    const account: Account = WalletUnlocked.generate({ provider });
    await transactionRequest.addAccountWitnesses(account);
    // #endregion transaction-request-6

    expect(transactionRequest.witnesses.length).toEqual(2);
  });

  it('gets the transaction ID', () => {
    // #region transaction-request-7
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({ script: scriptBytecode });

    // Get the chain ID
    const chainId = provider.getChainId();

    // Get the transaction ID using the Chain ID
    const transactionId = transactionRequest.getTransactionId(chainId);
    // TX ID: 0x55667d...
    // #endregion transaction-request-7

    expect(transactionId).toBe(
      '0x420f6093f32975eec3bd505e1a124be5e7352146841017b6142b34923e563f4b'
    );
  });
});
