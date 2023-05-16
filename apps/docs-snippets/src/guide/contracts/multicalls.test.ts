import type { Contract } from 'fuels';
import { NativeAssetId, BN, ContractFactory } from 'fuels';

import { getSnippetContractArtifacts, SnippetContractEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let echoContract: Contract;
  let counterContract: Contract;
  let contextContract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const counterArtifacts = getSnippetContractArtifacts(SnippetContractEnum.COUNTER);
    const echoArtifacts = getSnippetContractArtifacts(SnippetContractEnum.ECHO_VALUES);
    const contextArtifacts = getSnippetContractArtifacts(SnippetContractEnum.RETURN_CONTEXT);

    const factory1 = new ContractFactory(echoArtifacts.bin, echoArtifacts.abi, wallet);
    const factory2 = new ContractFactory(counterArtifacts.bin, counterArtifacts.abi, wallet);
    const factory3 = new ContractFactory(contextArtifacts.bin, contextArtifacts.abi, wallet);

    echoContract = await factory1.deployContract();
    counterContract = await factory2.deployContract();
    contextContract = await factory3.deployContract();
  });

  it('should successfully submit multiple calls from the same contract fuction', async () => {
    // #region multicall-1
    const { value: results } = await counterContract
      .multiCall([
        counterContract.functions.get_count(),
        counterContract.functions.increment_count(2),
        counterContract.functions.increment_count(4),
      ])
      .call();

    const initialValue = new BN(results[0]).toNumber();
    const incrementedValue1 = new BN(results[1]).toNumber();
    const incrementedValue2 = new BN(results[2]).toNumber();

    expect(incrementedValue1).toEqual(initialValue + 2);
    expect(incrementedValue2).toEqual(incrementedValue1 + 4);
    // #endregion multicall-1
  });

  it('should successfully submit multiple calls from different contracts fuctions', async () => {
    // #region multicall-2
    const chain = echoContract.multiCall([
      echoContract.functions.echo_u8(17),
      counterContract.functions.get_count(),
      counterContract.functions.increment_count(5),
    ]);

    const { value: results } = await chain.call();

    const echoedValue = results[0];
    const initialCounterValue = new BN(results[1]).toNumber();
    const counterIncrementedValue = new BN(results[2]).toNumber();

    expect(echoedValue).toEqual(17);
    expect(counterIncrementedValue).toEqual(initialCounterValue + 5);
    // #endregion multicall-2
  });

  it('should successfully submit multiple calls from different contracts fuctions', async () => {
    // #region multicall-3
    const { value: results } = await contextContract
      .multiCall([
        echoContract.functions.echo_u8(10),
        contextContract.functions.return_context_amount().callParams({
          forward: [100, NativeAssetId],
        }),
      ])
      .call();

    const echoedValue = results[0];
    const fowardedValue = new BN(results[1]).toNumber();

    expect(echoedValue).toEqual(10);
    expect(fowardedValue).toEqual(100);
    // #endregion multicall-3
  });
});
