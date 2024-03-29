import type { Contract } from 'fuels';
import { BN, PolicyType } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
  });

  it('should successfully execute contract call with txParams', async () => {
    // #region transaction-parameters-2
    // #region variable-outputs-1
    const tip = 1;
    const { transactionResult } = await contract.functions
      .increment_count(15)
      .txParams({
        variableOutputs: 1,
        tip,
      })
      .call();
    // #endregion variable-outputs-1
    // #endregion transaction-parameters-2

    const { transaction } = transactionResult;

    const gasLimitPolicy = transaction.policies?.find((policy) => policy.type === PolicyType.Tip);

    expect(new BN(gasLimitPolicy?.data).toNumber()).toBe(tip);
  });

  it('should succesfully execute contract call without txParams', async () => {
    const { gasUsed } = await contract.functions.increment_count(15).dryRun();

    // #region transaction-parameters-4
    const { transactionResult } = await contract.functions.increment_count(15).call();
    // #endregion transaction-parameters-4

    const { transaction } = transactionResult;

    expect(new BN(transaction.scriptGasLimit).toNumber()).toBe(gasUsed.toNumber());
  });

  it('should fail to execute call if gasLimit is too low', async () => {
    // #region transaction-parameters-3

    await expect(
      contract.functions
        .increment_count(10)
        .txParams({
          gasLimit: 1,
        })
        .call()
    ).rejects.toThrowError(/Gas limit [\s\S]* is lower than the required/);
    // #endregion transaction-parameters-3
  });
});
