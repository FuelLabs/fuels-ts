import type { Bytes } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoBytesFactory } from '../../../test/typegen';

/**
 * @group node
 * @group browser
 */
describe('Bytes', () => {
  it('should pass bytes to a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoBytesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region bytes-1
    // #import { Bytes };

    const bytes: Bytes = [40, 41, 42];

    const { value } = await contract.functions.bytes_comparison(bytes).simulate();

    expect(value).toBeTruthy();
    // #endregion bytes-1
  });

  it('should retrieve bytes from a contract', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          factory: EchoBytesFactory,
        },
      ],
    });

    const {
      contracts: [contract],
    } = launched;

    // #region bytes-2
    // #import { Bytes };

    const bytes: Bytes = [8, 42, 77];

    const { value } = await contract.functions.echo_bytes(bytes).simulate();

    expect(value).toStrictEqual(new Uint8Array(bytes));
    // #endregion bytes-2
  });
});
