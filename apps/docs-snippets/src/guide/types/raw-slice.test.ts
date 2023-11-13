import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { BN, RawSlice } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe('RawSlice', () => {
  beforeAll(async (ctx) => {});

  it('should pass a raw slice to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-raw-slice')],
    });
    const {
      contracts: [contract],
    } = launched;
    // #region raw-slice-1
    // #context import type { RawSlice } from 'fuels';

    const rawSlice: RawSlice = [40, 41, 42];

    const { value } = await contract.functions.raw_slice_comparison(rawSlice).simulate();

    expect(value).toBeTruthy();
    // #endregion raw-slice-1
  });

  it('should retrieve a raw slice from a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-raw-slice')],
    });
    const {
      contracts: [contract],
    } = launched;
    // #region raw-slice-2
    // #context import type { RawSlice } from 'fuels';

    const rawSlice: RawSlice = [8, 42, 77];

    const { value } = await contract.functions.echo_raw_slice(rawSlice).simulate();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual(rawSlice);
    // #endregion raw-slice-2
  });
});
