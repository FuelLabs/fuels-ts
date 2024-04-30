import type { Contract, TxParams } from 'fuels';
import { ScriptTransactionRequest, bn } from 'fuels';
import { expectTypeOf } from 'vitest';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  const { binHexlified: scriptBytecode } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.SUM_SCRIPT
  );

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
  });

  it('matches tx param types', () => {
    // #region transaction-parameters-1
    // #import { TxParams, bn };

    const txParams: TxParams = {
      gasLimit: bn(1), // BigNumberish or undefined
      maturity: 1, // number or undefined
      maxFee: bn(1), // BigNumberish or undefined
      witnessLimit: bn(1), // BigNumberish or undefined
      variableOutputs: 1, // number or undefined
    };
    // #endregion transaction-parameters-1

    expectTypeOf(txParams).toMatchTypeOf<TxParams>();
  });

  it('executes a script transaction request with txParams', () => {
    // #region transaction-parameters-2
    // #import { ScriptTransactionRequest };

    // Instantiate the transaction request using a ScriptTransactionRequest
    // We can set txParams in the request constructor
    const transactionRequest = new ScriptTransactionRequest({
      script: scriptBytecode,
      gasLimit: 100,
    });
    // #endregion transaction-parameters-2

    expect(transactionRequest.gasLimit.toNumber()).toBe(100);
  });

  it('executes contract call with txParams', async () => {
    // #region transaction-parameters-3
    const { transactionResult } = await contract.functions
      .increment_count(15)
      .txParams({
        variableOutputs: 1,
      })
      .call();
    // #endregion transaction-parameters-3

    expect(transactionResult.isStatusSuccess).toBeTruthy();
  });
});
