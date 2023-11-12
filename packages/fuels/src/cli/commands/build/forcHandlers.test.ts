import { mockLogger } from '../../../../test/utils/mockLogger';

import { onForcExit, onForcError } from './forcHandlers';

/**
 * @group node
 */
describe('buildSwayPrograms', () => {
  test('should resolve on successful exit', () => {
    const resolve = vi.fn();
    const reject = vi.fn((_reason?: number | Error) => {});
    onForcExit(resolve, reject)(null);
    expect(reject).toHaveBeenCalledTimes(0);
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  test('should reject on failed exit', () => {
    const resolve = vi.fn();
    const reject = vi.fn((_reason?: number | Error) => {});
    onForcExit(resolve, reject)(1);
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledTimes(0);
  });

  test('should reject on error', () => {
    const reject = vi.fn();
    const { error } = mockLogger();
    onForcError(reject)(new Error());
    expect(reject).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
  });
});
