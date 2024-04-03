import type { BN, JsonAbi, WalletUnlocked } from 'fuels';
import {
  BaseAssetId,
  ContractFactory,
  FunctionInvocationResult,
  Wallet,
  Contract,
  bn,
} from 'fuels';

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

  beforeAll(async () => {
    const { abiContents, binHexlified, storageSlots } = getDocsSnippetsForcProject(
      DocSnippetProjectsEnum.COUNTER
    );
    senderWallet = await getTestWallet();
    receiverWallet = Wallet.generate({ provider: senderWallet.provider });
    const factory = new ContractFactory(binHexlified, abiContents, senderWallet);
    const { minGasPrice: gasPrice } = senderWallet.provider.getGasConfig();
    contract = await factory.deployContract({ storageSlots, gasPrice });
    abi = abiContents;
  });

  it('creates a custom transaction from a contract call', async () => {
    const gasPrice = senderWallet.provider.getGasConfig().minGasPrice;
    const initialBalance = await receiverWallet.getBalance(BaseAssetId);
    expect(initialBalance.toNumber()).toBe(0);

    // #region custom-transactions-contract-calls
    // #import { bn, Contract, FunctionInvocationResult };

    const amountToRecipient = bn(10_000); // 0x2710
    // Connect to the contract
    const contractInstance = new Contract(contract.id, abi, senderWallet);
    // Create an invocation scope for the contract function you'd like to call in the transaction
    const scope = contractInstance.functions
      .increment_count(amountToRecipient)
      .txParams({ gasPrice });
    // Fund the transaction
    await scope.fundWithRequiredCoins();
    // Build a transaction request from the invocation scope
    const transactionRequest = await scope.getTransactionRequest();
    // Add coin output for the recipient
    transactionRequest.addCoinOutput(receiverWallet.address, amountToRecipient, BaseAssetId);
    // Submit the transaction
    const response = await senderWallet.sendTransaction(transactionRequest);
    await response.waitForResult();
    // Get result of contract call
    const { value } = await FunctionInvocationResult.build([scope], response, false, contract);
    // <BN: 0x2710>
    // #endregion custom-transactions-contract-calls

    const receiverBalance = await receiverWallet.getBalance(BaseAssetId);
    expect(receiverBalance.toNumber()).toBeGreaterThan(initialBalance.toNumber());
    expect((value as BN).toNumber()).toBe(amountToRecipient.toNumber());
  });
});
