import { supportedTypes } from './supportedTypes';

/**
 * @group node
 */
describe('supportedTypes.ts', () => {
  test('should export all supported types', () => {
    expect(supportedTypes.length).toEqual(21);
  });
});
