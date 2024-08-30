import type { RawSlice } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoRawSliceFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('RawSlice', () => {
  it('should pass a raw slice to a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoRawSliceFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region raw-slice-1
    // #import { RawSlice };

    const rawSlice: RawSlice = [40, 41, 42];

    const { value } = await contract.functions.raw_slice_comparison(rawSlice).simulate();

    expect(value).toBeTruthy();
    // #endregion raw-slice-1
  });

  it('should retrieve a raw slice from a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoRawSliceFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region raw-slice-2
    // #import { RawSlice };

    const rawSlice: RawSlice = [8, 42, 77];

    const { value } = await contract.functions.echo_raw_slice(rawSlice).simulate();

    expect(value).toStrictEqual(rawSlice);
    // #endregion raw-slice-2
  });
});
