import { FuelGaugeProjectsEnum } from '../test/fixtures';

import { setupContract } from './utils';

/**
 * @group node
 */
describe('isReadOnly', () => {
  test('isReadOnly returns true for a read-only function', async () => {
    using contractInstance = await setupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT);

    const isReadOnly = contractInstance.functions.counter.isReadOnly();

    expect(isReadOnly).toBe(true);
  });

  test('isReadOnly returns false for a function containing write operations', async () => {
    using contractInstance = await setupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT);

    const isReadOnly = contractInstance.functions.increment_counter.isReadOnly();

    expect(isReadOnly).toBe(false);
  });

  test('isReadOnly does not throw a runtime error for a function that does not use storage', async () => {
    using contractInstance = await setupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT);

    const isReadOnly = contractInstance.functions.return_true.isReadOnly();

    expect(isReadOnly).toBe(true);
  });
});
