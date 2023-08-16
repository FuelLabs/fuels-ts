import * as constantsMod from './constants';

const { TEST_BROWSER } = constantsMod;

describe(`${TEST_BROWSER} - index.js`, () => {
  test('should export all test env constants', () => {
    expect(Object.keys(constantsMod).length).toBe(2);
    expect(constantsMod.TEST_BROWSER).toBe('env:browser');
    expect(constantsMod.TEST_NODE).toBe('env:node');
  });
});
