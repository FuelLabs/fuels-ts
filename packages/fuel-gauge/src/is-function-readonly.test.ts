import { FuelGaugeProjectsEnum } from '../test/fixtures';

import { getSetupContract } from './utils';

/**
 * @group node
 */
describe('isReadOnly', () => {
  test('isReadOnly returns true for a read-only function', async () => {
    const contract = await getSetupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT)();

    const isReadOnly = contract.functions.counter.isReadOnly();

    expect(isReadOnly).toBe(true);
  });

  test('isReadOnly returns false for a function containing write operations', async () => {
    const contract = await getSetupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT)();

    const isReadOnly = contract.functions.increment_counter.isReadOnly();

    expect(isReadOnly).toBe(false);
  });

  test('isReadOnly does not throw a runtime error for a function that does not use storage', async () => {
    const contract = await getSetupContract(FuelGaugeProjectsEnum.STORAGE_TEST_CONTRACT)();

    const isReadOnly = contract.functions.return_true.isReadOnly();

    expect(isReadOnly).toBe(true);
  });
});
