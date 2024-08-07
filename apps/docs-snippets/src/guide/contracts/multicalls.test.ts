import type { Contract, Provider } from 'fuels';
import { BN, ContractFactory } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';
import { getTestWallet } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let echoContract: Contract;
  let counterContract: Contract;
  let contextContract: Contract;
  let provider: Provider;
  let baseAssetId: string;

  beforeAll(async () => {
    const wallet = await getTestWallet();
    provider = wallet.provider;
    baseAssetId = provider.getBaseAssetId();

    const counterArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.COUNTER);
    const echoArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.ECHO_VALUES);
    const contextArtifacts = getDocsSnippetsForcProject(DocSnippetProjectsEnum.RETURN_CONTEXT);

    const factory1 = new ContractFactory(
      echoArtifacts.binHexlified,
      echoArtifacts.abiContents,
      wallet
    );
    const factory2 = new ContractFactory(
      counterArtifacts.binHexlified,
      counterArtifacts.abiContents,
      wallet
    );
    const factory3 = new ContractFactory(
      contextArtifacts.binHexlified,
      contextArtifacts.abiContents,
      wallet
    );

    let { waitForResult } = await factory1.deploy();
    ({ contract: echoContract } = await waitForResult());

    ({ waitForResult } = await factory2.deploy({
      storageSlots: counterArtifacts.storageSlots,
    }));

    ({ contract: counterContract } = await waitForResult());

    ({ waitForResult } = await factory3.deploy());
    ({ contract: contextContract } = await waitForResult());
  });

  it('should successfully submit multiple calls from the same contract function', async () => {
    // #region multicall-1

    const { waitForResult } = await counterContract
      .multiCall([
        counterContract.functions.get_count(),
        counterContract.functions.increment_counter(2),
        counterContract.functions.increment_counter(4),
      ])
      .call();

    const { value: results } = await waitForResult();

    const initialValue = new BN(results[0]).toNumber();
    const incrementedValue1 = new BN(results[1]).toNumber();
    const incrementedValue2 = new BN(results[2]).toNumber();

    expect(incrementedValue1).toEqual(initialValue + 2);
    expect(incrementedValue2).toEqual(incrementedValue1 + 4);
    // #endregion multicall-1
  });

  it('should successfully submit multiple calls from different contracts functions', async () => {
    // #region multicall-2

    const chain = echoContract.multiCall([
      echoContract.functions.echo_u8(17),
      counterContract.functions.get_count(),
      counterContract.functions.increment_counter(5),
    ]);

    const { waitForResult } = await chain.call();
    const { value: results } = await waitForResult();

    const echoedValue = results[0];
    const initialCounterValue = new BN(results[1]).toNumber();
    const counterIncrementedValue = new BN(results[2]).toNumber();

    expect(echoedValue).toEqual(17);
    expect(counterIncrementedValue).toEqual(initialCounterValue + 5);
    // #endregion multicall-2
  });

  it('should successfully submit multiple calls from different contracts functions', async () => {
    // #region multicall-3

    const { waitForResult } = await contextContract
      .multiCall([
        echoContract.functions.echo_u8(10),
        contextContract.functions.return_context_amount().callParams({
          forward: [100, baseAssetId],
        }),
      ])
      .call();

    const { value: results } = await waitForResult();

    const echoedValue = results[0];
    const fowardedValue = new BN(results[1]).toNumber();

    expect(echoedValue).toEqual(10);
    expect(fowardedValue).toEqual(100);
    // #endregion multicall-3
  });
});
