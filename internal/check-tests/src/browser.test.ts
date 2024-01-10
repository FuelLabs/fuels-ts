import { testEach } from './index';

/**
 * @group browser
 */
describe('in:browser', () => {
  it('should work on browser', () => {
    expect(testEach()).toEqual('browser');
    expect(process.env.TEST_ENVIRONMENT).toEqual('browser');
  });
});
