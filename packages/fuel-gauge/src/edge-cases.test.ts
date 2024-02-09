import { getSetupContract } from './utils';

/**
 * @group node
 */
describe('Edge Cases', () => {
  it('can run collision_in_fn_names', async () => {
    const contract = await getSetupContract('collision_in_fn_names')();

    expect((await contract.functions.new().call()).value.toNumber()).toEqual(12345);
  });
});
