import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { BaseAssetId, BN } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  it('should successfully submit multiple calls from the same contract function', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter')],
    });
    const {
      contracts: [counterContract],
      provider,
    } = launched;

    // #region multicall-1
    const { minGasPrice } = provider.getGasConfig();

    const { value: results } = await counterContract
      .multiCall([
        counterContract.functions.get_count(),
        counterContract.functions.increment_count(2),
        counterContract.functions.increment_count(4),
      ])
      .txParams({ gasPrice: minGasPrice })
      .call();

    const initialValue = new BN(results[0]).toNumber();
    const incrementedValue1 = new BN(results[1]).toNumber();
    const incrementedValue2 = new BN(results[2]).toNumber();

    expect(incrementedValue1).toEqual(initialValue + 2);
    expect(incrementedValue2).toEqual(incrementedValue1 + 4);
    // #endregion multicall-1
  });

  it('should successfully submit multiple calls from different contracts functions', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('counter'), getProgramDir('echo-values')],
    });
    const {
      contracts: [counterContract, echoContract],
      provider,
    } = launched;

    // #region multicall-2
    const { minGasPrice } = provider.getGasConfig();

    const chain = echoContract
      .multiCall([
        echoContract.functions.echo_u8(17),
        counterContract.functions.get_count(),
        counterContract.functions.increment_count(5),
      ])
      .txParams({ gasPrice: minGasPrice });

    const { value: results } = await chain.call();

    const echoedValue = results[0];
    const initialCounterValue = new BN(results[1]).toNumber();
    const counterIncrementedValue = new BN(results[2]).toNumber();

    expect(echoedValue).toEqual(17);
    expect(counterIncrementedValue).toEqual(initialCounterValue + 5);
    // #endregion multicall-2
  });

  it('should successfully submit multiple calls from different contracts functions', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-values'), getProgramDir('return-context')],
    });
    const {
      contracts: [echoContract, contextContract],
      provider,
    } = launched;

    // #region multicall-3
    const { minGasPrice } = provider.getGasConfig();

    const { value: results } = await contextContract
      .multiCall([
        echoContract.functions.echo_u8(10),
        contextContract.functions.return_context_amount().callParams({
          forward: [100, BaseAssetId],
        }),
      ])
      .txParams({ gasPrice: minGasPrice })
      .call();

    const echoedValue = results[0];
    const fowardedValue = new BN(results[1]).toNumber();

    expect(echoedValue).toEqual(10);
    expect(fowardedValue).toEqual(100);
    // #endregion multicall-3
  });
});
