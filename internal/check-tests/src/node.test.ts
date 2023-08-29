import { testEach } from './index';

/**
 * @group node
 */
describe('in:node', () => {
  it('should work on node', () => {
    expect(testEach()).toEqual('node');
  });
});
