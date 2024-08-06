import type { Account, Coin, Resource } from 'fuels';
import {
  CreateTransactionRequest,
  ScriptTransactionRequest,
  arrayify,
  ZeroBytes32,
  Address,
  bn,
  Predicate,
  WalletUnlocked,
} from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { SimplePredicateAbi__factory, SumScriptAbi__factory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transaction Request', () => {
  const address = Address.fromRandom();

  it('creates a transaction request from ScriptTransactionRequest', () => {
    const scriptMainFunctionArguments = [1];

    // #region transaction-request-1
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request using a ScriptTransactionRequest
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Set the script main function arguments (can also be passed in the class constructor)
    transactionRequest.setData(SumScriptAbi__factory.abi, scriptMainFunctionArguments);
    // #endregion transaction-request-1

    expect(transactionRequest.script).toEqual(arrayify(SumScriptAbi__factory.bin));
  });

  it('creates a transaction request fromm a CreateTransactionRequest', () => {
    const contractByteCode = ZeroBytes32;

    // #region transaction-request-2
    // #import { CreateTransactionRequest };

    // Instantiate the transaction request using a CreateTransactionRequest
    const transactionRequest = new CreateTransactionRequest({
      witnesses: [contractByteCode],
    });
    // #endregion transaction-request-2

    expect(transactionRequest.witnesses[0]).toEqual(contractByteCode);
  });

  it('modifies a transaction request', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const message = {
      assetId: provider.getBaseAssetId(),
      sender: address,
      recipient: address,
      nonce: '0x',
      amount: bn(0),
      daHeight: bn(0),
    };
    const coin: Coin = {
      id: '0x',
      assetId: provider.getBaseAssetId(),
      amount: bn(0),
      owner: address,
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    };
    const recipientAddress = address;
    const resource = coin;
    const resources: Resource[] = [resource];

    // #region transaction-request-3
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Adding resources (coins or messages)
    transactionRequest.addResources(resources);
    transactionRequest.addResource(resource);

    // Adding coin inputs and outputs (including transfer to recipient)
    transactionRequest.addCoinInput(coin);
    transactionRequest.addCoinOutput(recipientAddress, 1000, provider.getBaseAssetId());

    // Adding message inputs
    transactionRequest.addMessageInput(message);
    // #endregion transaction-request-3

    expect(transactionRequest.script).toEqual(arrayify(SumScriptAbi__factory.bin));
    expect(transactionRequest.inputs.length).toEqual(4);
    expect(transactionRequest.outputs.length).toEqual(2);
    expect(transactionRequest.witnesses.length).toEqual(1);
  });

  it('adds a contract to a transaction request', () => {
    const contractId = Address.fromRandom();

    // #region transaction-request-4
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Add the contract input and output using the contract ID
    transactionRequest.addContractInputAndOutput(contractId);
    // #endregion transaction-request-4

    expect(transactionRequest.inputs.length).toEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('adds a predicate to a transaction request', async () => {
    using launched = await launchTestNode();
    const {
      provider,
      wallets: [fundedWallet],
    } = launched;

    const dataToValidatePredicate = [ZeroBytes32];

    // #region transaction-request-5
    // #import { ScriptTransactionRequest, Predicate };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Instantiate the predicate and pass valid input data to validate
    // the predicate and unlock the funds
    const predicate = new Predicate({
      bytecode: SimplePredicateAbi__factory.bin,
      abi: SimplePredicateAbi__factory.abi,
      data: dataToValidatePredicate,
      provider,
    });

    // fund the predicate
    const tx1 = await fundedWallet.transfer(predicate.address, bn(100_000));
    await tx1.waitForResult();

    const predicateCoins = await predicate.getResourcesToSpend([
      { amount: 2000, assetId: provider.getBaseAssetId() },
    ]);

    // Add the predicate input and resources
    transactionRequest.addResources(predicateCoins);
    // #endregion transaction-request-5

    expect(transactionRequest.inputs.length).toBeGreaterThanOrEqual(1);
    expect(transactionRequest.outputs.length).toEqual(1);
  });

  it('adds a witness to a transaction request', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const witness = ZeroBytes32;

    // #region transaction-request-6
    // #import { ScriptTransactionRequest, Account, WalletUnlocked };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Add a witness directly
    transactionRequest.addWitness(witness);

    // Add a witness using an account
    const account: Account = WalletUnlocked.generate({ provider });
    await transactionRequest.addAccountWitnesses(account);
    // #endregion transaction-request-6

    expect(transactionRequest.witnesses.length).toEqual(2);
  });

  it('gets the transaction ID', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    // #region transaction-request-7
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScriptAbi__factory.bin,
    });

    // Get the chain ID
    const chainId = provider.getChainId();

    // Get the transaction ID using the Chain ID
    const transactionId = transactionRequest.getTransactionId(chainId);
    // TX ID: 0x420f6...
    // #endregion transaction-request-7

    expect(transactionId).toBe(
      '0x5e12f588de0cbf2ec0f085078880d5eeb3e18cd239a288d4a06ee4247a97e4f2'
    );
  });
});
