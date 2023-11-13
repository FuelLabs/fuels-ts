import { testAll } from './index';

/**
 * @group node
 * @group browser
 */
describe('in:everywhere', () => {
  it('should work everywhere', () => {
    expect(testAll()).toEqual('thank you');
  });
});
