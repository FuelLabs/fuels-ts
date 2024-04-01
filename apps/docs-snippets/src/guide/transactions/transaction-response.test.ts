import type { Provider, Contract, WalletUnlocked, BN } from 'fuels';
import { BaseAssetId, ScriptTransactionRequest, TransactionResponse } from 'fuels';

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
  let gasPrice: BN;

  const { abiContents: scriptAbi, binHexlified: scriptBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
    provider = contract.provider;
    gasPrice = provider.getGasConfig().minGasPrice;
  });

  it('gets transaction response from contract call', async () => {
    // #region transaction-response-1
    // #import { TransactionResponse };

    // Call a contract function
    const call = await contract.functions.increment_count(15).call();

    // Pick off the transaction response
    const transactionResponse: TransactionResponse = call.transactionResponse;

    // Retrieve the full transaction summary
    const transactionSummary = await transactionResponse.getTransactionSummary();
    // #endregion transaction-response-1

    expect(call.transactionId).toEqual(transactionSummary.id);
  });

  it('gets transaction response from transaction request', async () => {
    const scriptMainFunctionArguments = [1];
    const resources = await wallet.getResourcesToSpend([{ amount: 1000, assetId: BaseAssetId }]);

    // #region transaction-response-2
    // #import { ScriptTransactionRequest, TransactionResponse };

    // Instantiate the transaction request using a ScriptTransactionRequest and set
    // the script main function arguments
    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
      gasPrice,
    });
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);

    // Fund the transaction
    transactionRequest.addResources(resources);

    // Submit the transaction
    const response: TransactionResponse = await wallet.sendTransaction(transactionRequest);

    // Generate the transaction summary
    const transactionSummary = await response.getTransactionSummary();
    // #endregion transaction-response-2

    expect(response.id).toEqual(transactionSummary.id);
  });

  it('gets transaction response from tx id', async () => {
    const scriptMainFunctionArguments = [1];
    const resources = await wallet.getResourcesToSpend([{ amount: 1000, assetId: BaseAssetId }]);

    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
      gasPrice,
    });
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);
    transactionRequest.addResources(resources);
    const response: TransactionResponse = await wallet.sendTransaction(transactionRequest);

    const previouslySubmittedTransactionId = transactionRequest.getTransactionId(
      provider.getChainId()
    );

    // #region transaction-response-3
    // #import { TransactionResponse };

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
