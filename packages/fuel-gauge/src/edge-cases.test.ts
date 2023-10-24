import { getSetupContract } from './utils';

describe('Edge Cases', () => {
  it('can run collision_in_fn_names', async () => {
    const contract = await getSetupContract('collision_in_fn_names')();

    const { minGasPrice } = contract.provider.getGasConfig();

    expect(
      (await contract.functions.new().txParams({ gasPrice: minGasPrice }).call()).value.toNumber()
    ).toEqual(12345);
  });
});
