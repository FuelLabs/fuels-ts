import { TestNodeLauncher } from '@fuel-ts/test-utils';

import { getContractDir } from './utils';

const contractDir = getContractDir('collision_in_fn_names');
/**
 * @group node
 */
describe('Edge Cases', () => {
  it('can run collision_in_fn_names', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contract],
    } = launched;
    const { minGasPrice } = contract.provider.getGasConfig();

    expect(
      (await contract.functions.new().txParams({ gasPrice: minGasPrice }).call()).value.toNumber()
    ).toEqual(12345);
  });
});
