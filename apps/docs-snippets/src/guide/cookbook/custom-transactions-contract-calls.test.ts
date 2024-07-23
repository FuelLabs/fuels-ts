import type { BN, JsonAbi, WalletUnlocked } from 'fuels';
import { ContractFactory, Wallet, Contract, bn, buildFunctionResult } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Custom Transactions from Contract Calls', () => {
  let senderWallet: WalletUnlocked;
  let receiverWallet: WalletUnlocked;
  let contract: Contract;
  let abi: JsonAbi;
  let baseAssetId: string;

  beforeAll(async () => {
    const { abiContents, binHexlified, storageSlots } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.COUNTER
    );
    senderWallet = await getTestWallet();
    receiverWallet = Wallet.generate({ provider: senderWallet.provider });
    const factory = new ContractFactory(binHexlified, abiContents, senderWallet);
    const { waitForResult } = await factory.deployContract({ storageSlots });
    ({ contract } = await waitForResult());
    abi = abiContents;
    baseAssetId = senderWallet.provider.getBaseAssetId();
  });

  it('creates a custom transaction from a contract call', async () => {
    const initialBalance = await receiverWallet.getBalance(baseAssetId);
    expect(initialBalance.toNumber()).toBe(0);

    // #region custom-transactions-contract-calls
    // #import { bn, Contract, buildFunctionResult };

    const amountToRecipient = bn(10_000); // 0x2710
    // Connect to the contract
    const contractInstance = new Contract(contract.id, abi, senderWallet);
    // Create an invocation scope for the contract function you'd like to call in the transaction
    const scope = contractInstance.functions.increment_counter(amountToRecipient).addTransfer({
      amount: amountToRecipient,
      destination: receiverWallet.address,
      assetId: baseAssetId,
    });

    // Build a transaction request from the invocation scope
    const transactionRequest = await scope.getTransactionRequest();
    // Add coin output for the recipient
    transactionRequest.addCoinOutput(receiverWallet.address, amountToRecipient, baseAssetId);

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

    const receiverBalance = await receiverWallet.getBalance(baseAssetId);
    expect(receiverBalance.toNumber()).toBeGreaterThan(initialBalance.toNumber());
    expect((value as BN).toNumber()).toBe(amountToRecipient.toNumber());
  });
});
