import { isDefined } from './isDefined';

/**
 * @group node
 * @group browser
 */
describe('isDefined', () => {
  it('should return true for non-undefined values', () => {
    expect(isDefined(0)).toBe(true);
    expect(isDefined('')).toBe(true);
    expect(isDefined(false)).toBe(true);
    expect(isDefined(null)).toBe(true);
    expect(isDefined({})).toBe(true);
    expect(isDefined([])).toBe(true);
  });

  it('should return false for undefined values', () => {
    expect(isDefined(undefined)).toBe(false);
  });
});
