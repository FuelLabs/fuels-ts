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

  it('should successfully execute a simulate call', async () => {
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
});
