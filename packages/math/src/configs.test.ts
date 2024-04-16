import {
  DEFAULT_DECIMAL_UNITS,
  DEFAULT_PRECISION,
  DEFAULT_MIN_PRECISION,
  DECIMAL_FUEL,
  DECIMAL_GWEI,
  DECIMAL_KWEI,
  DECIMAL_MWEI,
  DECIMAL_WEI,
} from './configs';

/**
 * @group node
 * @group browser
 */
describe('configs', () => {
  it('units should not change', () => {
    // Defaults
    expect(DEFAULT_PRECISION).toEqual(9);
    expect(DEFAULT_MIN_PRECISION).toEqual(3);
    expect(DEFAULT_DECIMAL_UNITS).toEqual(9);

    // Fuel units
    expect(DECIMAL_FUEL).toEqual(9);

    // Ether units
    expect(DECIMAL_WEI).toEqual(18);
    expect(DECIMAL_KWEI).toEqual(15);
    expect(DECIMAL_MWEI).toEqual(12);
    expect(DECIMAL_GWEI).toEqual(9);
  });
});
