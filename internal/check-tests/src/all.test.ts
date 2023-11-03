import { testAll } from './index';

/**
 * @group node
 */
describe('in:everywhere', () => {
  it('should work everywhere', () => {
    expect(testAll()).toEqual('thank you');
  });
});
