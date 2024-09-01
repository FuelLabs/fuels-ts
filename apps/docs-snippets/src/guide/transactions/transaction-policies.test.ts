import type { TransactionResponse, Policy, BNInput } from 'fuels';
import { ScriptTransactionRequest, bn, PolicyType } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { SumScript } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Transaction Policies', () => {
  it('sets policies', () => {
    // #region transaction-policies-1
    // #import { ScriptTransactionRequest };

    const transactionRequest = new ScriptTransactionRequest({
      tip: bn(10), // Sets the tip policy
      witnessLimit: bn(1), // Sets the witness limit policy
      maturity: 1, // Sets the maturity policy
      maxFee: bn(1), // Sets the max fee policy
    });
    // #endregion transaction-policies-1

    const { policyTypes, policies } = ScriptTransactionRequest.getPolicyMeta(transactionRequest);

    expect(policyTypes).toBe(15);
    expect(policies?.[0].type).toBe(PolicyType.Tip);
    expect(bn(policies?.[0].data).eq(transactionRequest.tip as BNInput)).toBeTruthy();
    expect(policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(policies?.[1].data).eq(bn(transactionRequest.witnessLimit))).toBeTruthy();
    expect(policies?.[2].type).toBe(PolicyType.Maturity);
    expect(policies?.[2]?.data).toBe(transactionRequest.maturity);
    expect(policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(policies?.[3].data).eq(bn(transactionRequest.maxFee))).toBeTruthy();
  });

  it('gets transaction response from tx id', async () => {
    using launched = await launchTestNode({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1ms'],
      },
    });
    const {
      wallets: [wallet],
    } = launched;
    const { provider } = launched;
    const scriptMainFunctionArguments = [1];
    const resources = await wallet.getResourcesToSpend([
      { amount: 1000, assetId: provider.getBaseAssetId() },
    ]);

    // #region transaction-policies-2
    // #import { ScriptTransactionRequest, TransactionResponse, Policy };

    // Instantiate the transaction request with transaction parameters that would
    // set the respective policies.
    const transactionRequest = new ScriptTransactionRequest({
      script: SumScript.bytecode,
      gasLimit: bn(2000),
      maturity: 2,
      tip: bn(3),
      witnessLimit: 900,
      maxFee: bn(60_000),
    });

    // Set the script main function arguments
    transactionRequest.setData(SumScript.abi, scriptMainFunctionArguments);

    // Fund the transaction
    transactionRequest.addResources(resources);

    // Submit the transaction and retrieve the transaction response
    const tx: TransactionResponse = await wallet.sendTransaction(transactionRequest);
    const response = await tx.waitForResult();
    // is undefined if the transaction had no policies applied.
    const policies: Policy[] | undefined = response.transaction.policies;
    // #endregion transaction-policies-2

    if (!policies) {
      throw new Error('No policies found');
    }

    expect(policies?.[0].type).toBe(PolicyType.Tip);
    expect(bn(policies?.[0].data).eq(transactionRequest.tip as BNInput)).toBeTruthy();
    expect(policies?.[1].type).toBe(PolicyType.WitnessLimit);
    expect(bn(policies?.[1].data).eq(bn(transactionRequest.witnessLimit))).toBeTruthy();
    expect(policies?.[2].type).toBe(PolicyType.Maturity);
    expect(policies?.[2]?.data).toBe(transactionRequest.maturity);
    expect(policies?.[3].type).toBe(PolicyType.MaxFee);
    expect(bn(policies?.[3].data).eq(bn(transactionRequest.maxFee))).toBeTruthy();
  });
});
