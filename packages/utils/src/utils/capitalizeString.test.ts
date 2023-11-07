import { capitalizeString } from './capitalizeString';

describe('capitalizeString', () => {
  test('should capitalize string', () => {
    expect(capitalizeString('test')).toEqual('Test');
    expect(capitalizeString('')).toEqual('');
  });
});
