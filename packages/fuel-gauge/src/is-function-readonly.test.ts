import { StorageTestContractFactory } from '../test/typegen/contracts';

import { launchTestContract } from './utils';

function setupContract() {
  return launchTestContract({
    factory: StorageTestContractFactory,
  });
}
/**
 * @group node
 * @group browser
 */
describe('isReadOnly', () => {
  test('isReadOnly returns true for a read-only function', async () => {
    using contract = await setupContract();

    const isReadOnly = contract.functions.counter.isReadOnly();

    expect(isReadOnly).toBe(true);
  });

  test('isReadOnly returns false for a function containing write operations', async () => {
    using contract = await setupContract();

    const isReadOnly = contract.functions.increment_counter.isReadOnly();

    expect(isReadOnly).toBe(false);
  });

  test('isReadOnly does not throw a runtime error for a function that does not use storage', async () => {
    using contract = await setupContract();

    const isReadOnly = contract.functions.return_true.isReadOnly();

    expect(isReadOnly).toBe(true);
  });
});
