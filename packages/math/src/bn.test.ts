import type { BN } from './bn';
import { bn } from './bn';
import type { BigNumberish } from './types';

describe('Math - Convert', () => {
  it('can execute operations without losing our BN reference', async () => {
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

  it('can convert between hex and Uint8Array', async () => {
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

  it('can convert between number and Uint8Array', async () => {
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
});
