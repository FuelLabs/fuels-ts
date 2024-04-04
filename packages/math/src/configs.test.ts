import {
  DECIMAL_UNITS,
  DEFAULT_PRECISION,
  DEFAULT_MIN_PRECISION,
  UNITS_ETHER,
  UNITS_FINNEY,
  UNITS_FUEL,
  UNITS_GWEI,
  UNITS_KWEI,
  UNITS_MWEI,
  UNITS_SZADO,
  UNITS_WEI,
} from './configs';

describe('configs', () => {
  it('units should not change', () => {
    // Defaults
    expect(DEFAULT_PRECISION).toEqual(9);
    expect(DEFAULT_MIN_PRECISION).toEqual(3);
    expect(DECIMAL_UNITS).toEqual(9);

    // Fuel units
    expect(UNITS_FUEL).toEqual(9);

    // Ether units
    expect(UNITS_WEI).toEqual(0);
    expect(UNITS_KWEI).toEqual(3);
    expect(UNITS_MWEI).toEqual(6);
    expect(UNITS_GWEI).toEqual(9);
    expect(UNITS_SZADO).toEqual(12);
    expect(UNITS_FINNEY).toEqual(15);
    expect(UNITS_ETHER).toEqual(18);
  });
});
