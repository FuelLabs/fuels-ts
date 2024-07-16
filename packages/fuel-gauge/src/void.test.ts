import { launchTestNode } from 'fuels/test-utils';

import { VoidAbi__factory } from '../test/typegen';
import VoidAbiHex from '../test/typegen/contracts/VoidAbi.hex';

/**
 * @group node
 */
describe('Vector Tests', () => {
  it('should return a void', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: VoidAbi__factory,
          bytecode: VoidAbiHex,
        },
      ],
    });

    const {
      contracts: [voidContract],
    } = launched;

    const { waitForResult } = await voidContract.functions.return_void().call();
    const { value } = await waitForResult();

    expect(value).toEqual(undefined);
  });
});
