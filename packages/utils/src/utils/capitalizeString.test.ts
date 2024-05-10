import { capitalizeString } from './capitalizeString';

/**
 * @group node
 * @group browser
 */
describe('capitalizeString', () => {
  test('should capitalize string', () => {
    expect(capitalizeString('test')).toEqual('Test');
    expect(capitalizeString('')).toEqual('');
  });
});
