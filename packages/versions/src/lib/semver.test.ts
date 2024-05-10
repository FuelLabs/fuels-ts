import { eq, gt, majorEq, minorEq, patchEq } from './semver';

/**
 * @group node
 */
describe('semver', () => {
  test('majorEq', () => {
    expect(majorEq('1.2.3', '1.2.3')).toBe(true);
    expect(majorEq('1.2.3', '1.2.4')).toBe(true);
    expect(majorEq('1.2.3', '1.3.3')).toBe(true);
    expect(majorEq('1.2.3', '2.2.3')).toBe(false);
  });
  test('minorEq', () => {
    expect(minorEq('1.2.3', '1.2.3')).toBe(true);
    expect(minorEq('1.2.3', '1.2.4')).toBe(true);
    expect(minorEq('1.2.3', '2.2.3')).toBe(true);
    expect(minorEq('1.2.3', '1.3.3')).toBe(false);
  });
  test('patchEq', () => {
    expect(patchEq('1.2.3', '1.2.3')).toBe(true);
    expect(patchEq('1.2.3', '1.3.3')).toBe(true);
    expect(patchEq('1.2.3', '2.2.3')).toBe(true);
    expect(patchEq('1.2.3', '1.2.4')).toBe(false);
  });
  test('gt', () => {
    expect(gt('1.2.3', '0.2.3')).toBe(true);
    expect(gt('1.2.3', '1.1.3')).toBe(true);
    expect(gt('1.2.3', '1.2.2')).toBe(true);
    expect(gt('1.2.3', '1.2.3')).toBe(false);
    expect(gt('1.2.3', '2.2.3')).toBe(false);
    expect(gt('1.2.3', '1.3.3')).toBe(false);
    expect(gt('1.2.3', '1.2.4')).toBe(false);
  });
  test('eq', () => {
    expect(eq('1.2.3', '1.2.3')).toBe(true);
    expect(eq('1.2.3', '0.2.3')).toBe(false);
    expect(eq('1.2.3', '2.2.3')).toBe(false);
    expect(eq('1.2.3', '1.1.3')).toBe(false);
    expect(eq('1.2.3', '1.3.3')).toBe(false);
    expect(eq('1.2.3', '1.2.2')).toBe(false);
    expect(eq('1.2.3', '1.2.4')).toBe(false);
  });
});
