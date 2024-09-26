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

    expect(results[0]).toEqual(0);
    expect(results[0]).toEqual(2);
    expect(results[0]).toEqual(6);
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
    const { waitForResult } = await echoContract
      .multiCall([
        echoContract.functions.echo_u8(17),
        counterContract.functions.get_count(),
        counterContract.functions.increment_counter(5),
      ])
      .call();

    const { value: results } = await waitForResult();

    expect(results[0]).toEqual(17);
    expect(results[0]).toEqual(0);
    expect(results[0]).toEqual(5);
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
