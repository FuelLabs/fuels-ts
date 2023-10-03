import { testEach } from './index';

/**
 * @group browser
 */
describe('in:browser', () => {
  it('should work on browser', () => {
    expect(testEach()).toEqual('browser');
  });
});
