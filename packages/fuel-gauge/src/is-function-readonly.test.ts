import { StorageTestContractAbi__factory } from '../test/typegen/contracts';
import StorageTestContractAbiHex from '../test/typegen/contracts/StorageTestContractAbi.hex';

import { launchTestContract } from './utils';

function setupContract() {
  return launchTestContract({
    deployer: StorageTestContractAbi__factory,
    bytecode: StorageTestContractAbiHex,
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
