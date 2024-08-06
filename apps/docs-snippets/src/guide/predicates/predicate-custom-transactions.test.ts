import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ConfigurablePin as PredicateFactory } from '../../../test/typegen';
import type { ConfigurablePinInputs as PredicateInputs } from '../../../test/typegen/predicates/ConfigurablePin';

/**
 * @group node
 * @group browser
 */
describe('Predicate Custom Transactions', () => {
  it('uses a predicate in a custom transaction', async () => {
    using launched = await launchTestNode();
    const {
      wallets: [testSender, testReceiver],
      provider: testProvider,
    } = launched;

    const SENDER_PVT_KEY = testSender.privateKey;
    const RECEIVER_ADDRESS = testReceiver.address;

    const TESTNET_NETWORK_URL = testProvider.url;

    await Provider.create(TESTNET_NETWORK_URL);

    const initialRecieverBalance = await testReceiver.getBalance(testProvider.getBaseAssetId());

    // #region predicate-custom-transaction
    // #import { Provider, ScriptTransactionRequest, TESTNET_NETWORK_URL, Wallet };
    // #context import { PredicateFactory } from 'path/to/typegen/outputs';
    // #context import type { PredicateInputs } from 'path/to/typegen/outputs';
    // #context import { SENDER_PVT_KEY, RECEIVER_ADDRESS } from 'path/to/my/env/file';

    // Setup
    const provider = await Provider.create(TESTNET_NETWORK_URL);
    const sender = Wallet.fromPrivateKey(SENDER_PVT_KEY, provider);
    const receiver = Wallet.fromAddress(RECEIVER_ADDRESS, provider);
    const assetId = provider.getBaseAssetId();
    const amountToFundPredicate = 300_000;
    const amountToReceiver = 100_000;

    // Instantiate the predicate using valid predicate data, aka the pin we need
    // to send the funds to the receiver
    const data: PredicateInputs = [1337];
    const predicate = new PredicateFactory({ provider, data });

    // Fund the predicate, so that we can send these funds via predicate logic
    // to the receiver
    const fundPredicateTx = await sender.transfer(
      predicate.address,
      amountToFundPredicate,
      assetId
    );
    await fundPredicateTx.waitForResult();
    const initialPredicateBalance = await predicate.getBalance(assetId);

    // Instantiate the script request
    const customRequest = new ScriptTransactionRequest();

    // Get the predicate resources that we would like to transfer
    const predicateResources = await predicate.getResourcesToSpend([
      { assetId, amount: amountToReceiver },
    ]);

    // Add the resources for the transfer of the asset to the receiver. The resources
    // adds the required inputs, and the output is for the transfer to the receiver address
    customRequest.addResources(predicateResources);
    customRequest.addCoinOutput(receiver.address, amountToReceiver, assetId);

    // Estimate the transaction cost and fund accordingly
    const txCost = await predicate.getTransactionCost(customRequest);
    customRequest.gasLimit = txCost.gasUsed;
    customRequest.maxFee = txCost.maxFee;
    await predicate.fund(customRequest, txCost);

    // Submit the transaction and await it's result
    const predicateTx = await predicate.sendTransaction(customRequest);
    await predicateTx.waitForResult();
    // #endregion predicate-custom-transaction

    expect(initialPredicateBalance.toNumber()).toEqual(amountToFundPredicate);
    const { isStatusSuccess } = await predicateTx.waitForResult();
    expect(isStatusSuccess).toBe(true);
    const finalReceiverBalance = await receiver.getBalance(assetId);
    expect(finalReceiverBalance.toNumber()).toEqual(
      initialRecieverBalance.add(amountToReceiver).toNumber()
    );
  });
});
