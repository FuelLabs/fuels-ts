import { supportedTypes } from './supportedTypes';

describe('supportedTypes.ts', () => {
  test('should export all supported types', () => {
    expect(supportedTypes.length).toEqual(21);
  });
});
