import { testEach } from './index';

/**
 * @group browser
 */
describe('in:browser', () => {
  it.skip('should work on browser', () => {
    expect(testEach()).toEqual('browser');
  });
});
