import type { BN } from 'fuels';
import { Contract, bn, buildFunctionResult, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CounterAbi__factory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Custom Transactions from Contract Calls', () => {
  it('creates a custom transaction from a contract call', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterAbi__factory,
        },
      ],
    });
    const {
      contracts: [contract],
      provider,
      wallets: [senderWallet],
    } = launched;

    const receiverWallet = Wallet.generate({ provider });

    const initialBalance = await receiverWallet.getBalance(provider.getBaseAssetId());
    expect(initialBalance.toNumber()).toBe(0);

    // #region custom-transactions-contract-calls
    // #import { bn, Contract, buildFunctionResult };

    const amountToRecipient = bn(10_000); // 0x2710
    // Connect to the contract
    const contractInstance = new Contract(contract.id, CounterAbi__factory.abi, senderWallet);
    // Create an invocation scope for the contract function you'd like to call in the transaction
    const scope = contractInstance.functions.increment_counter(amountToRecipient).addTransfer({
      amount: amountToRecipient,
      destination: receiverWallet.address,
      assetId: provider.getBaseAssetId(),
    });

    // Build a transaction request from the invocation scope
    const transactionRequest = await scope.getTransactionRequest();
    // Add coin output for the recipient
    transactionRequest.addCoinOutput(
      receiverWallet.address,
      amountToRecipient,
      provider.getBaseAssetId()
    );

    const txCost = await senderWallet.getTransactionCost(transactionRequest);

    transactionRequest.gasLimit = txCost.gasUsed;
    transactionRequest.maxFee = txCost.maxFee;

    await senderWallet.fund(transactionRequest, txCost);

    // Submit the transaction
    const response = await senderWallet.sendTransaction(transactionRequest);
    await response.waitForResult();
    // Get result of contract call
    const { value } = await buildFunctionResult({
      funcScope: scope,
      isMultiCall: false,
      program: contract,
      transactionResponse: response,
    });
    // <BN: 0x2710>
    // #endregion custom-transactions-contract-calls

    const receiverBalance = await receiverWallet.getBalance(provider.getBaseAssetId());
    expect(receiverBalance.toNumber()).toBeGreaterThan(initialBalance.toNumber());
    expect((value as BN).toNumber()).toBe(amountToRecipient.toNumber());
  });
});
