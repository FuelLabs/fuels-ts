import { TestNodeLauncher } from '@fuel-ts/test-utils';
import type { Bytes } from 'fuels';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe('Bytes', () => {
  it('should pass bytes to a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-bytes')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region bytes-1
    // #context import type { Bytes } from 'fuels';

    const bytes: Bytes = [40, 41, 42];

    const { value } = await contract.functions.bytes_comparison(bytes).simulate();

    expect(value).toBeTruthy();
    // #endregion bytes-1
  });

  it('should retrieve bytes from a contract', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-bytes')],
    });
    const {
      contracts: [contract],
    } = launched;

    // #region bytes-2
    // #context import type { Bytes } from 'fuels';

    const bytes: Bytes = [8, 42, 77];

    const { value } = await contract.functions.echo_bytes(bytes).simulate();

    expect(value).toStrictEqual(new Uint8Array(bytes));
    // #endregion bytes-2
  });
});
