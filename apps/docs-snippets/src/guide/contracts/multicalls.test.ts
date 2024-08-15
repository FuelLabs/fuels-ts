import { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { CounterFactory, EchoValuesFactory, ReturnContextFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Multicalls', () => {
  it('should successfully submit multiple calls from the same contract function', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [counterContract],
    } = launched;
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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoValuesFactory,
        },
        {
          factory: CounterFactory,
        },
      ],
    });

    const {
      contracts: [echoContract, counterContract],
    } = launched;
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
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: ReturnContextFactory,
        },
        {
          factory: EchoValuesFactory,
        },
      ],
    });

    const {
      contracts: [contextContract, echoContract],
      provider,
    } = launched;
    // #region multicall-3

    const { waitForResult } = await contextContract
      .multiCall([
        echoContract.functions.echo_u8(10),
        contextContract.functions.return_context_amount().callParams({
          forward: [100, provider.getBaseAssetId()],
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
