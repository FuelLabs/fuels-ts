import type { BN } from './bn';
import { bn } from './bn';
import type { BigNumberish } from './types';

/**
 * @group node
 * @group browser
 */
describe('Math - BN', () => {
  it('can execute operations without losing our BN reference', () => {
    let test: BN;

    test = bn(2).add(2).sub(2).pow('0x3');
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.mul(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.div(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.sqr();
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.neg();
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.abs();
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.fromTwos(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.toTwos(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.mod(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');

    test = test.divRound(2);
    expect(test.toString(16).substring(2, 0)).toEqual('0x');
  });

  it('can convert between hex and Uint8Array', () => {
    let bytesToConvert: Uint8Array;
    let hexToConvert: string;

    bytesToConvert = Uint8Array.from([0]);
    hexToConvert = '0x0';
    expect(bn(bytesToConvert).toHex()).toEqual(hexToConvert);
    expect(bn(hexToConvert).toBytes()).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1]);
    hexToConvert = '0x1';
    expect(bn(bytesToConvert).toHex()).toEqual(hexToConvert);
    expect(bn(hexToConvert).toBytes()).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255]);
    hexToConvert = '0x1ff';
    expect(bn(bytesToConvert).toHex()).toEqual(hexToConvert);
    expect(bn(hexToConvert).toBytes()).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255, 255]);
    hexToConvert = '0x1ffff';
    expect(bn(bytesToConvert).toHex()).toEqual(hexToConvert);
    expect(bn(hexToConvert).toBytes()).toEqual(bytesToConvert);
  });

  it('can convert between number and Uint8Array', () => {
    let bytesToConvert: Uint8Array;
    let numberToConvert: number;

    bytesToConvert = Uint8Array.from([0]);
    numberToConvert = 0;
    expect(bn(bytesToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toBytes()).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1]);
    numberToConvert = 1;
    expect(bn(bytesToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toBytes()).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255]);
    numberToConvert = 511;
    expect(bn(bytesToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toBytes()).toEqual(bytesToConvert);
  });

  it('can convert between number and hex', () => {
    let hexToConvert: string;
    let numberToConvert: number;

    hexToConvert = '0x0';
    numberToConvert = 0;
    expect(bn(hexToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toHex()).toEqual(hexToConvert);

    hexToConvert = '0x1';
    numberToConvert = 1;
    expect(bn(hexToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toHex()).toEqual(hexToConvert);

    hexToConvert = '0x11';
    numberToConvert = 17;
    expect(bn(hexToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toHex()).toEqual(hexToConvert);

    hexToConvert = '0x111';
    numberToConvert = 273;
    expect(bn(hexToConvert).toNumber()).toEqual(numberToConvert);
    expect(bn(numberToConvert).toHex()).toEqual(hexToConvert);
  });

  it('should toHex accept bytePadding config', () => {
    let numberToConvert: number;
    let bytesToConvert: Uint8Array;

    numberToConvert = 0;
    expect(bn(numberToConvert).toHex()).toEqual('0x0');
    expect(bn(numberToConvert).toHex(1)).toEqual('0x00');
    expect(bn(numberToConvert).toHex(2)).toEqual('0x0000');
    expect(bn(numberToConvert).toHex(3)).toEqual('0x000000');
    expect(bn(numberToConvert).toHex(4)).toEqual('0x00000000');
    expect(bn(numberToConvert).toHex(5)).toEqual('0x0000000000');
    expect(bn(numberToConvert).toHex(6)).toEqual('0x000000000000');
    expect(bn(numberToConvert).toHex(7)).toEqual('0x00000000000000');
    expect(bn(numberToConvert).toHex(8)).toEqual('0x0000000000000000');

    numberToConvert = 1;
    expect(bn(numberToConvert).toHex()).toEqual('0x1');
    expect(bn(numberToConvert).toHex(1)).toEqual('0x01');
    expect(bn(numberToConvert).toHex(2)).toEqual('0x0001');
    expect(bn(numberToConvert).toHex(3)).toEqual('0x000001');
    expect(bn(numberToConvert).toHex(4)).toEqual('0x00000001');
    expect(bn(numberToConvert).toHex(5)).toEqual('0x0000000001');
    expect(bn(numberToConvert).toHex(6)).toEqual('0x000000000001');
    expect(bn(numberToConvert).toHex(7)).toEqual('0x00000000000001');
    expect(bn(numberToConvert).toHex(8)).toEqual('0x0000000000000001');

    bytesToConvert = Uint8Array.from([0]);
    expect(bn(bytesToConvert).toHex()).toEqual('0x0');
    expect(bn(bytesToConvert).toHex(1)).toEqual('0x00');
    expect(bn(bytesToConvert).toHex(2)).toEqual('0x0000');
    expect(bn(bytesToConvert).toHex(3)).toEqual('0x000000');
    expect(bn(bytesToConvert).toHex(4)).toEqual('0x00000000');
    expect(bn(bytesToConvert).toHex(5)).toEqual('0x0000000000');
    expect(bn(bytesToConvert).toHex(6)).toEqual('0x000000000000');
    expect(bn(bytesToConvert).toHex(7)).toEqual('0x00000000000000');
    expect(bn(bytesToConvert).toHex(8)).toEqual('0x0000000000000000');

    bytesToConvert = Uint8Array.from([1]);
    expect(bn(bytesToConvert).toHex()).toEqual('0x1');
    expect(bn(bytesToConvert).toHex(1)).toEqual('0x01');
    expect(bn(bytesToConvert).toHex(2)).toEqual('0x0001');
    expect(bn(bytesToConvert).toHex(3)).toEqual('0x000001');
    expect(bn(bytesToConvert).toHex(4)).toEqual('0x00000001');
    expect(bn(bytesToConvert).toHex(5)).toEqual('0x0000000001');
    expect(bn(bytesToConvert).toHex(6)).toEqual('0x000000000001');
    expect(bn(bytesToConvert).toHex(7)).toEqual('0x00000000000001');
    expect(bn(bytesToConvert).toHex(8)).toEqual('0x0000000000000001');
  });

  it('should toArray accept bytePadding config', () => {
    let numberToConvert: number;
    let hexToConvert: string;

    numberToConvert = 0;
    expect(bn(numberToConvert).toBytes()).toEqual(Uint8Array.from([0]));
    expect(bn(numberToConvert).toBytes(1)).toEqual(Uint8Array.from([0]));
    expect(bn(numberToConvert).toBytes(2)).toEqual(Uint8Array.from([0, 0]));
    expect(bn(numberToConvert).toBytes(3)).toEqual(Uint8Array.from([0, 0, 0]));
    expect(bn(numberToConvert).toBytes(4)).toEqual(Uint8Array.from([0, 0, 0, 0]));
    expect(bn(numberToConvert).toBytes(5)).toEqual(Uint8Array.from([0, 0, 0, 0, 0]));
    expect(bn(numberToConvert).toBytes(6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0]));
    expect(bn(numberToConvert).toBytes(7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0]));
    expect(bn(numberToConvert).toBytes(8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));

    numberToConvert = 1;
    expect(bn(numberToConvert).toBytes()).toEqual(Uint8Array.from([1]));
    expect(bn(numberToConvert).toBytes(1)).toEqual(Uint8Array.from([1]));
    expect(bn(numberToConvert).toBytes(2)).toEqual(Uint8Array.from([0, 1]));
    expect(bn(numberToConvert).toBytes(3)).toEqual(Uint8Array.from([0, 0, 1]));
    expect(bn(numberToConvert).toBytes(4)).toEqual(Uint8Array.from([0, 0, 0, 1]));
    expect(bn(numberToConvert).toBytes(5)).toEqual(Uint8Array.from([0, 0, 0, 0, 1]));
    expect(bn(numberToConvert).toBytes(6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 1]));
    expect(bn(numberToConvert).toBytes(7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 1]));
    expect(bn(numberToConvert).toBytes(8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]));

    hexToConvert = '0x0';
    expect(bn(hexToConvert).toBytes()).toEqual(Uint8Array.from([0]));
    expect(bn(hexToConvert).toBytes(1)).toEqual(Uint8Array.from([0]));
    expect(bn(hexToConvert).toBytes(2)).toEqual(Uint8Array.from([0, 0]));
    expect(bn(hexToConvert).toBytes(3)).toEqual(Uint8Array.from([0, 0, 0]));
    expect(bn(hexToConvert).toBytes(4)).toEqual(Uint8Array.from([0, 0, 0, 0]));
    expect(bn(hexToConvert).toBytes(5)).toEqual(Uint8Array.from([0, 0, 0, 0, 0]));
    expect(bn(hexToConvert).toBytes(6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0]));
    expect(bn(hexToConvert).toBytes(7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0]));
    expect(bn(hexToConvert).toBytes(8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));

    hexToConvert = '0x1';
    expect(bn(hexToConvert).toBytes()).toEqual(Uint8Array.from([1]));
    expect(bn(hexToConvert).toBytes(1)).toEqual(Uint8Array.from([1]));
    expect(bn(hexToConvert).toBytes(2)).toEqual(Uint8Array.from([0, 1]));
    expect(bn(hexToConvert).toBytes(3)).toEqual(Uint8Array.from([0, 0, 1]));
    expect(bn(hexToConvert).toBytes(4)).toEqual(Uint8Array.from([0, 0, 0, 1]));
    expect(bn(hexToConvert).toBytes(5)).toEqual(Uint8Array.from([0, 0, 0, 0, 1]));
    expect(bn(hexToConvert).toBytes(6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 1]));
    expect(bn(hexToConvert).toBytes(7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 1]));
    expect(bn(hexToConvert).toBytes(8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]));
  });

  it('should toNumber work when number is inside safe range and break when number provided is too big', () => {
    const maxSafeNumber = Number.MAX_SAFE_INTEGER;
    let maxSafe: BigNumberish | Uint8Array;
    let over: BigNumberish | Uint8Array;

    maxSafe = maxSafeNumber;
    over = Number.MAX_SAFE_INTEGER + 1;
    expect(bn(maxSafe).toNumber()).toEqual(maxSafeNumber);
    expect(() => bn(over).toNumber()).toThrow();

    maxSafe = '0x1fffffffffffff';
    over = '0x20000000000000';
    expect(bn(maxSafe).toNumber()).toEqual(maxSafeNumber);
    expect(() => bn(over).toNumber()).toThrow();

    maxSafe = Uint8Array.from([31, 255, 255, 255, 255, 255, 255]);
    over = Uint8Array.from([32, 0, 0, 0, 0, 0, 0]);
    expect(bn(maxSafe).toNumber()).toEqual(maxSafeNumber);
    expect(() => bn(over).toNumber()).toThrow();
  });

  it('should toArray break when value provided is bigger than bytePadding config', () => {
    let maxBytes: Uint8Array;
    let over: Uint8Array;

    maxBytes = Uint8Array.from([255]);
    over = Uint8Array.from([1, 0]);
    expect(bn(maxBytes).toBytes(1)).toEqual(maxBytes);
    expect(() => bn(over).toBytes(1)).toThrow();

    maxBytes = Uint8Array.from([255, 255]);
    over = Uint8Array.from([1, 0, 0]);
    expect(bn(maxBytes).toBytes(2)).toEqual(maxBytes);
    expect(() => bn(over).toBytes(2)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255]);
    over = Uint8Array.from([1, 0, 0, 0]);
    expect(bn(maxBytes).toBytes(3)).toEqual(maxBytes);
    expect(() => bn(over).toBytes(3)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255, 255]);
    over = Uint8Array.from([1, 0, 0, 0, 0]);
    expect(bn(maxBytes).toBytes(4)).toEqual(maxBytes);
    expect(() => bn(over).toBytes(4)).toThrow();
  });

  it('should ensure max method works just like expected', () => {
    // Using Number
    const maxNumber = 100_000;
    const exceedingNumber = maxNumber + 1;

    let maxSafeNumber = bn(exceedingNumber).max(maxNumber);

    expect(maxSafeNumber.toNumber()).toEqual(maxNumber);

    // Using BN
    maxSafeNumber = bn(maxNumber).add(1).max(bn(maxNumber));
    expect(maxSafeNumber.toNumber()).toEqual(maxNumber);
  });

  it('should toHex break when value provided is bigger than bytePadding config', () => {
    let maxBytes: Uint8Array;
    let maxHex: string;
    let over: Uint8Array;

    maxBytes = Uint8Array.from([255]);
    maxHex = '0xff';
    over = Uint8Array.from([1, 0]);
    expect(bn(maxBytes).toHex(1)).toEqual(maxHex);
    expect(() => bn(over).toHex(1)).toThrow();

    maxBytes = Uint8Array.from([255, 255]);
    maxHex = '0xffff';
    over = Uint8Array.from([1, 0, 0]);
    expect(bn(maxBytes).toHex(2)).toEqual(maxHex);
    expect(() => bn(over).toHex(2)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255]);
    maxHex = '0xffffff';
    over = Uint8Array.from([1, 0, 0, 0]);
    expect(bn(maxBytes).toHex(3)).toEqual(maxHex);
    expect(() => bn(over).toHex(3)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255, 255]);
    maxHex = '0xffffffff';
    over = Uint8Array.from([1, 0, 0, 0, 0]);
    expect(bn(maxBytes).toHex(4)).toEqual(maxHex);
    expect(() => bn(over).toHex(4)).toThrow();
  });

  it('should create bn with number or undefined or null', () => {
    const inputs: { numb: number; str: string; undef?: string; nil: null } = {
      numb: 2,
      str: '5',
      nil: null,
    };

    expect(bn().toNumber()).toEqual(0);
    expect(bn(inputs?.undef).toNumber()).toEqual(0);
    expect(bn(inputs?.nil).toNumber()).toEqual(0);
    expect(bn(inputs?.numb).toNumber()).toEqual(2);
    expect(bn(inputs?.str).toNumber()).toEqual(5);
  });

  it('should formatUnits from default unit', () => {
    expect(bn('1000000000').formatUnits()).toEqual('1.000000000');
    expect(bn('2').formatUnits()).toEqual('0.000000002');
    expect(bn('20000').formatUnits()).toEqual('0.000020000');
    expect(bn('100000020000').formatUnits()).toEqual('100.000020000');
    expect(bn('100100000020000').formatUnits()).toEqual('100100.000020000');
  });

  it('should formatUnits from supplied unit', () => {
    expect(bn('1000000000').formatUnits(7)).toEqual('100.0000000');
    expect(bn('2').formatUnits(7)).toEqual('0.0000002');
    expect(bn('20000').formatUnits(7)).toEqual('0.0020000');
    expect(bn('100000020000').formatUnits(7)).toEqual('10000.0020000');
    expect(bn('100100000020000').formatUnits(7)).toEqual('10010000.0020000');
  });

  it('should format with default configs', () => {
    expect(bn('1000000000').format()).toEqual('1.000');
    expect(bn('2').format()).toEqual('0.000000002');
    expect(bn('22000').format()).toEqual('0.000022');
    expect(bn('100000020000').format()).toEqual('100.00002');
    expect(bn('100100000020000').format()).toEqual('100,100.00002');
  });

  it('should format with NOT default configs', () => {
    expect(
      bn('1000000000').format({
        minPrecision: 2,
      })
    ).toEqual('1.00');
    expect(
      bn('1000000000').format({
        minPrecision: 2,
        units: 8,
      })
    ).toEqual('10.00');
    expect(
      bn('1000000000').format({
        minPrecision: 2,
        units: 10,
      })
    ).toEqual('0.10');
    expect(
      bn('1000000000').format({
        minPrecision: 4,
        precision: 3,
      })
    ).toEqual('1.000');

    expect(
      bn('1123000000').format({
        minPrecision: 3,
        precision: 4,
      })
    ).toEqual('1.123');
    expect(
      bn('1123000000').format({
        minPrecision: 4,
        precision: 4,
      })
    ).toEqual('1.1230');

    expect(
      bn('2').format({
        minPrecision: 2,
      })
    ).toEqual('0.000000002');
    expect(
      bn('2').format({
        minPrecision: 2,
        units: 10,
      })
    ).toEqual('0.0000000002');
    expect(
      bn('2').format({
        minPrecision: 2,
        units: 8,
      })
    ).toEqual('0.00000002');

    expect(
      bn('22000').format({
        minPrecision: 2,
      })
    ).toEqual('0.000022');

    expect(
      bn('100000020000').format({
        minPrecision: 8,
        precision: 8,
      })
    ).toEqual('100.00002000');
    expect(
      bn('100000020000').format({
        minPrecision: 4,
        precision: 8,
      })
    ).toEqual('100.00002');
    expect(
      bn('100000020000').format({
        minPrecision: 4,
        precision: 4,
      })
    ).toEqual('100.0000');

    expect(
      bn('100100000020000').format({
        minPrecision: 1,
      })
    ).toEqual('100,100.00002');
    expect(
      bn('100100000020000').format({
        minPrecision: 2,
        units: 8,
      })
    ).toEqual('1,001,000.0002');

    expect(
      bn('100100000020000').format({
        minPrecision: 3,
        units: 10,
      })
    ).toEqual('10,010.000002');
    expect(
      bn('100100000020000').format({
        units: 10,
      })
    ).toEqual('10,010.000002');

    expect(
      bn('1001000000200000000').format({
        minPrecision: 2,
        units: 8,
      })
    ).toEqual('10,010,000,002.00');
    expect(
      bn('1001000000200000000').format({
        units: 8,
      })
    ).toEqual('10,010,000,002.000');
    expect(
      bn('1001000000200000000').format({
        minPrecision: 2,
      })
    ).toEqual('1,001,000,000.20');
    expect(
      bn('1001000000200000000').format({
        minPrecision: 5,
      })
    ).toEqual('1,001,000,000.20000');
    expect(
      bn('1001000000200000000').format({
        minPrecision: 5,
        precision: 8,
      })
    ).toEqual('1,001,000,000.20000');

    expect(
      bn('100100020000').format({
        minPrecision: 4,
        precision: 8,
      })
    ).toEqual('100.10002');
  });

  it('should parse to bn unit from decimal/inputs/string values', () => {
    expect(bn.parseUnits('1').toHex()).toEqual(bn('1000000000').toHex());
    expect(bn.parseUnits('0.000000002').toHex()).toEqual(bn(2).toHex());
    expect(bn.parseUnits('0.00002').toHex()).toEqual(bn('20000').toHex());
    expect(bn.parseUnits('100.00002').toHex()).toEqual(bn('100000020000').toHex());
    expect(bn.parseUnits('100,100.00002').toHex()).toEqual(bn('100100000020000').toHex());
    expect(bn.parseUnits('100,100.00002', 5).toHex()).toEqual(bn('10010000002').toHex());
    expect(bn.parseUnits('1,100,100.00002', 5).toHex()).toEqual(bn('110010000002').toHex());
    expect(bn.parseUnits('100,100,100.00002', 5).toHex()).toEqual(bn('10010010000002').toHex());
    expect(bn.parseUnits('.').toHex()).toEqual(bn('0').toHex());
    expect(bn.parseUnits('.', 5).toHex()).toEqual(bn('0').toHex());

    expect(() => {
      bn.parseUnits('100,100.000002', 5);
    }).toThrow("Decimal can't have more than 5 digits.");
  });

  it('should normalize zero to one', () => {
    expect(bn(0).normalizeZeroToOne().eq(1)).toBeTruthy();

    expect(bn(2).normalizeZeroToOne().eq(1)).not.toBeTruthy();
  });

  it('should match valueOf to toString with no base arguments', () => {
    expect(bn('1000000000').valueOf()).toEqual('1000000000');
    expect(bn('2').valueOf()).toEqual('2');
    expect(bn('20000').valueOf()).toEqual('20000');
    expect(bn('100000020000').valueOf()).toEqual('100000020000');
    expect(bn('100100000020000').valueOf()).toEqual('100100000020000');
    expect(bn('-1').valueOf()).toEqual('-1');
  });

  it('should format properly with 0 units', () => {
    expect(bn('1000000000').format({ units: 0 })).toEqual('1,000,000,000');
  });

  it('should format properly with 0 precision', () => {
    expect(bn('1000000000').format({ units: 5, precision: 0 })).toEqual('10,000');
  });

  it('should format properly with 0 units and precision', () => {
    expect(bn('1000000000').format({ units: 0, precision: 0 })).toEqual('1,000,000,000');
  });

  it('should format properly with 0 minPrecision', () => {
    expect(bn('1000000000').format({ minPrecision: 0 })).toEqual('1');
  });

  it('should properly format with minPrecision 0 and precision 1', () => {
    expect(bn('10010000').format({ units: 5, minPrecision: 0, precision: 1 })).toEqual('100.1');
  });

  it('should properly format with minPrecision 0 and precision 1 with a trailing zero', () => {
    expect(bn('100000').format({ units: 5, minPrecision: 0, precision: 1 })).toEqual('1');
  });

  it('should return significant figures even if it exceeds the precision', () => {
    expect(bn('4000000').format({ precision: 1 })).toEqual('0.004');
  });
});
