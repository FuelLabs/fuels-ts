import type { Provider, Contract, WalletUnlocked } from 'fuels';
import { ScriptTransactionRequest, TransactionResponse } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject, getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Transaction Response', () => {
  let contract: Contract;
  let provider: Provider;
  let wallet: WalletUnlocked;

  const { abiContents: scriptAbi, binHexlified: scriptBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
    provider = contract.provider;
  });

  it('gets transaction response from contract call', async () => {
    // #region transaction-response-1
    // Call a contract function
    const call = await contract.functions.increment_counter(15).call();

    // Wait for the result
    const { transactionResponse } = await call.waitForResult();

    // Retrieve the full transaction summary
    const transactionSummary = await transactionResponse.getTransactionSummary();
    // #endregion transaction-response-1

    expect(call.transactionId).toEqual(transactionSummary.id);
  });

  it('gets transaction response from transaction request', async () => {
    const scriptMainFunctionArguments = [1];

    // #region transaction-response-2
    // #import { ScriptTransactionRequest, TransactionResponse };

    // Instantiate the transaction request using a ScriptTransactionRequest and set
    // the script main function arguments
    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
    });
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);

    // Fund the transaction
    const txCost = await wallet.getTransactionCost(transactionRequest);

    transactionRequest.maxFee = txCost.maxFee;
    transactionRequest.gasLimit = txCost.gasUsed;

    await wallet.fund(transactionRequest, txCost);

    // Submit the transaction
    const response: TransactionResponse = await wallet.sendTransaction(transactionRequest);

    // Generate the transaction summary
    const transactionSummary = await response.getTransactionSummary();
    // #endregion transaction-response-2

    expect(response.id).toEqual(transactionSummary.id);
  });

  it('gets transaction response from tx id', async () => {
    const scriptMainFunctionArguments = [1];

    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
    });
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);

    const txCost = await wallet.getTransactionCost(transactionRequest);

    transactionRequest.maxFee = txCost.maxFee;
    transactionRequest.gasLimit = txCost.gasUsed;

    await wallet.fund(transactionRequest, txCost);
    const response: TransactionResponse = await wallet.sendTransaction(transactionRequest);

    const previouslySubmittedTransactionId = transactionRequest.getTransactionId(
      provider.getChainId()
    );

    // #region transaction-response-3
    // Take a transaction ID from a previous transaction
    const transactionId = previouslySubmittedTransactionId;
    // 0x...

    // Retrieve the transaction response from the transaction ID
    const transactionResponse = await TransactionResponse.create(transactionId, provider);

    // Generate the transaction summary
    const transactionSummary = await transactionResponse.getTransactionSummary();
    // #endregion transaction-response-3

    expect(response.id).toEqual(transactionSummary.id);
    expect(transactionId).toEqual(transactionSummary.id);
  });
});
