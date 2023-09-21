import { setupTestProvider } from '@fuel-ts/providers/test-utils';

import { getSetupContract } from './utils';

describe('Edge Cases', () => {
  it('can run collision_in_fn_names', async () => {
    using provider = await setupTestProvider();
    const contract = await getSetupContract('collision_in_fn_names')(provider);

    expect((await contract.functions.new().call()).value.toNumber()).toEqual(12345);
  });
});
