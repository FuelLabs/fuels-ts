import type { Provider } from 'fuels';
import { Wallet, Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;
  let provider: Provider;
  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
    provider = contract.provider;
  });

  it('should successfully execute a read only call with get', async () => {
    // #region read-only-calls-1
    const { value } = await contract.functions.echo_u8(15).get();
    // #endregion read-only-calls-1
    expect(value).toEqual(15);
  });

  it('should successfully execute a contract call using an unfunded wallet', async () => {
    // #region read-only-calls-2
    const unfundedWallet = Wallet.generate({ provider });

    contract.account = unfundedWallet;

    const { value } = await contract.functions.echo_u8(15).get();
    // #endregion read-only-calls-2
    expect(value).toEqual(15);
  });

  it('should successfully execute a contract call without a wallet', async () => {
    const abi = contract.interface;
    const contractId = contract.id;

    // #region read-only-calls-3
    // contract instantiated without an account instance
    const myContract = new Contract(contractId, abi, provider);

    const { value } = await myContract.functions.echo_u8(15).get();
    // #endregion read-only-calls-3
    expect(value).toEqual(15);
  });

  it('should successfully execute a contract call without a wallet', async () => {
    const counterContract = await createAndDeployContractFromProject(
      DocSnippetProjectsEnum.COUNTER
    );

    // #region read-only-calls-6
    const { value: valueUpdateOnlyOnDryRun } = await counterContract.functions
      .increment_count(1)
      .get();

    // The dry-run returns the incremented value, but the actual value remains the same
    // #context console.log(valueUpdateOnlyOnDryRun.toNumber());
    // #context > 1
    // #endregion read-only-calls-6
    expect(valueUpdateOnlyOnDryRun.toNumber()).toEqual(1);

    // #region read-only-calls-7
    const { value: realValue } = await counterContract.functions.get_count().get();

    // #context console.log(realValue.toNumber());
    // #context > 0
    // #endregion read-only-calls-7

    expect(realValue.toNumber()).toEqual(0);

    // #region read-only-calls-8
    await counterContract.functions.increment_count(1).call();

    const { value } = await counterContract.functions.get_count().get();

    // #context console.log(value.toNumber());
    // #context > 1
    // #endregion read-only-calls-8

    expect(value.toNumber()).toEqual(1);
  });
});
