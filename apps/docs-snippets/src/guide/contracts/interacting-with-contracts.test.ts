import type { Provider } from 'fuels';
import { BaseAssetId, Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject, getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let counterContract: Contract;
  let provider: Provider;
  beforeAll(async () => {
    counterContract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.COUNTER);
    provider = counterContract.provider;
  });

  it('should successfully use "get" to read from the blockchain', async () => {
    await counterContract.functions.increment_count(1).call();

    const { id: contractId, interface: abi } = counterContract;

    // #region interacting-with-contracts-1
    const contract = new Contract(contractId, abi, provider);

    const { value } = await contract.functions.get_count().get();
    // #endregion interacting-with-contracts-1
    expect(value.toNumber()).toBeGreaterThanOrEqual(1);
  });

  it('should successfully use "dryRun" to validate a TX without a wallet', async () => {
    const { id: contractId, interface: abi } = counterContract;

    // #region interacting-with-contracts-2
    const contract = new Contract(contractId, abi, provider);

    const { value } = await contract.functions.increment_count(1).dryRun();
    // #endregion interacting-with-contracts-2
    expect(value.toNumber()).toBeGreaterThanOrEqual(1);
  });

  it('should successfully use "simulate" to validate if wallet can pay for transaction', async () => {
    const { id: contractId, interface: abi } = counterContract;

    const fundedWallet = await getTestWallet([[10_000, BaseAssetId]]);

    // #region interacting-with-contracts-3
    const contract = new Contract(contractId, abi, fundedWallet);

    const { value } = await contract.functions.increment_count(10).simulate();
    // #endregion interacting-with-contracts-3
    expect(value.toNumber()).toBeGreaterThanOrEqual(10);
  });

  it('should successfully execute a contract call without a wallet', async () => {
    const contract = counterContract;

    // #region interacting-with-contracts-4
    await contract.functions.increment_count(10).call();
    // #endregion interacting-with-contracts-4

    const { value } = await contract.functions.get_count().get();
    expect(value.toNumber()).toBeGreaterThanOrEqual(10);
  });
});
