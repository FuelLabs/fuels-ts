import type { WalletUnlocked, TransactionResponse, Policy } from 'fuels';
import { BaseAssetId, ScriptTransactionRequest, bn, PolicyType } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe('Transaction Policies', () => {
  let wallet: WalletUnlocked;

  const { abiContents: scriptAbi, binHexlified: scriptBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    wallet = await getTestWallet();
  });

  it('sets policies', () => {
    // #region transaction-policies-1
    // #import { ScriptTransactionRequest };

    const transactionRequest = new ScriptTransactionRequest({
      gasPrice: bn(1), // Sets the gas price policy
      witnessLimit: bn(1), // Sets the witness limit policy
      maturity: 1, // Sets the maturity policy
      maxFee: bn(1), // Sets the max fee policy
    });
    // #endregion transaction-policies-1

    const { policyTypes, policies } = ScriptTransactionRequest.getPolicyMeta(transactionRequest);

    expect(policyTypes).toBe(15);
    expect(policies?.[0].type).toBe(PolicyType.GasPrice);
    expect(bn(policies?.[0].data).eq(transactionRequest.gasPrice)).toBeTruthy();
    expect(policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(policies?.[1].data).eq(bn(transactionRequest.witnessLimit))).toBeTruthy();
    expect(policies?.[2].type).toBe(PolicyType.Maturity);
    expect(policies?.[2]?.data).toBe(transactionRequest.maturity);
    expect(policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(policies?.[3].data).eq(bn(transactionRequest.maxFee))).toBeTruthy();
  });

  it('gets transaction response from tx id', async () => {
    const scriptMainFunctionArguments = [1];
    const resources = await wallet.getResourcesToSpend([{ amount: 1000, assetId: BaseAssetId }]);

    // #region transaction-policies-2
    // #import { ScriptTransactionRequest, TransactionResponse, Policy };

    // Instantiate the transaction request with transaction parameters that would
    // set the respective policies.
    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
      gasLimit: bn(1_000),
      maturity: 2,
      gasPrice: bn(3),
      witnessLimit: 900,
      maxFee: bn(10_000),
    });

    // Set the script main function arguments
    transactionRequest.setData(scriptAbi, scriptMainFunctionArguments);

    // Fund the transaction
    transactionRequest.addResources(resources);

    // Submit the transaction and retrieve the transaction response
    const tx: TransactionResponse = await wallet.sendTransaction(transactionRequest);
    const response = await tx.waitForResult();

    // Retrieve the policies from the transaction response. The policies property
    // is undefined if the transaction had no policies applied.
    const policies: Policy[] | undefined = response.transaction.policies;
    // #endregion transaction-policies-2

    if (!policies) {
      throw new Error('No policies found');
    }

    expect(policies?.[0].type).toBe(PolicyType.GasPrice);
    expect(bn(policies?.[0].data).eq(transactionRequest.gasPrice)).toBeTruthy();
    expect(policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(policies?.[1].data).eq(bn(transactionRequest.witnessLimit))).toBeTruthy();
    expect(policies?.[2].type).toBe(PolicyType.Maturity);
    expect(policies?.[2]?.data).toBe(transactionRequest.maturity);
    expect(policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(policies?.[3].data).eq(bn(transactionRequest.maxFee))).toBeTruthy();
  });
});
