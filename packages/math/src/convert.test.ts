import { bn } from './bn';
import { toArray, toHex, toNumber } from './convert';
import type { BigNumberish } from './types';

describe('Math - Convert', () => {
  it('can convert between hex and Uint8Array', async () => {
    let bytesToConvert: Uint8Array;
    let hexToConvert: string;

    bytesToConvert = Uint8Array.from([0]);
    hexToConvert = '0x0';
    expect(toHex(bytesToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(bytesToConvert))).toEqual(hexToConvert);
    expect(toArray(hexToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(hexToConvert))).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1]);
    hexToConvert = '0x1';
    expect(toHex(bytesToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(bytesToConvert))).toEqual(hexToConvert);
    expect(toArray(hexToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(hexToConvert))).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255]);
    hexToConvert = '0x1ff';
    expect(toHex(bytesToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(bytesToConvert))).toEqual(hexToConvert);
    expect(toArray(hexToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(hexToConvert))).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255, 255]);
    hexToConvert = '0x1ffff';
    expect(toHex(bytesToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(bytesToConvert))).toEqual(hexToConvert);
    expect(toArray(hexToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(hexToConvert))).toEqual(bytesToConvert);
  });

  it('can convert between number and Uint8Array', async () => {
    let bytesToConvert: Uint8Array;
    let numberToConvert: number;

    bytesToConvert = Uint8Array.from([0]);
    numberToConvert = 0;
    expect(toNumber(bytesToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(bytesToConvert))).toEqual(numberToConvert);
    expect(toArray(numberToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(numberToConvert))).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1]);
    numberToConvert = 1;
    expect(toNumber(bytesToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(bytesToConvert))).toEqual(numberToConvert);
    expect(toArray(numberToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(numberToConvert))).toEqual(bytesToConvert);

    bytesToConvert = Uint8Array.from([1, 255]);
    numberToConvert = 511;
    expect(toNumber(bytesToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(bytesToConvert))).toEqual(numberToConvert);
    expect(toArray(numberToConvert)).toEqual(bytesToConvert);
    expect(toArray(bn(numberToConvert))).toEqual(bytesToConvert);
  });

  it('can convert between number and hex', () => {
    let hexToConvert: string;
    let numberToConvert: number;

    hexToConvert = '0x0';
    numberToConvert = 0;
    expect(toNumber(hexToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(hexToConvert))).toEqual(numberToConvert);
    expect(toHex(numberToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(numberToConvert))).toEqual(hexToConvert);

    hexToConvert = '0x1';
    numberToConvert = 1;
    expect(toNumber(hexToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(hexToConvert))).toEqual(numberToConvert);
    expect(toHex(numberToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(numberToConvert))).toEqual(hexToConvert);

    hexToConvert = '0x11';
    numberToConvert = 17;
    expect(toNumber(hexToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(hexToConvert))).toEqual(numberToConvert);
    expect(toHex(numberToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(numberToConvert))).toEqual(hexToConvert);

    hexToConvert = '0x111';
    numberToConvert = 273;
    expect(toNumber(hexToConvert)).toEqual(numberToConvert);
    expect(toNumber(bn(hexToConvert))).toEqual(numberToConvert);
    expect(toHex(numberToConvert)).toEqual(hexToConvert);
    expect(toHex(bn(numberToConvert))).toEqual(hexToConvert);
  });

  it('should toHex accept bytePadding config', () => {
    let numberToConvert: number;
    let bytesToConvert: Uint8Array;

    numberToConvert = 0;
    expect(toHex(numberToConvert)).toEqual('0x0');
    expect(toHex(numberToConvert, 1)).toEqual('0x00');
    expect(toHex(numberToConvert, 2)).toEqual('0x0000');
    expect(toHex(numberToConvert, 3)).toEqual('0x000000');
    expect(toHex(numberToConvert, 4)).toEqual('0x00000000');
    expect(toHex(numberToConvert, 5)).toEqual('0x0000000000');
    expect(toHex(numberToConvert, 6)).toEqual('0x000000000000');
    expect(toHex(numberToConvert, 7)).toEqual('0x00000000000000');
    expect(toHex(numberToConvert, 8)).toEqual('0x0000000000000000');

    numberToConvert = 1;
    expect(toHex(numberToConvert)).toEqual('0x1');
    expect(toHex(numberToConvert, 1)).toEqual('0x01');
    expect(toHex(numberToConvert, 2)).toEqual('0x0001');
    expect(toHex(numberToConvert, 3)).toEqual('0x000001');
    expect(toHex(numberToConvert, 4)).toEqual('0x00000001');
    expect(toHex(numberToConvert, 5)).toEqual('0x0000000001');
    expect(toHex(numberToConvert, 6)).toEqual('0x000000000001');
    expect(toHex(numberToConvert, 7)).toEqual('0x00000000000001');
    expect(toHex(numberToConvert, 8)).toEqual('0x0000000000000001');

    bytesToConvert = Uint8Array.from([0]);
    expect(toHex(bytesToConvert)).toEqual('0x0');
    expect(toHex(bytesToConvert, 1)).toEqual('0x00');
    expect(toHex(bytesToConvert, 2)).toEqual('0x0000');
    expect(toHex(bytesToConvert, 3)).toEqual('0x000000');
    expect(toHex(bytesToConvert, 4)).toEqual('0x00000000');
    expect(toHex(bytesToConvert, 5)).toEqual('0x0000000000');
    expect(toHex(bytesToConvert, 6)).toEqual('0x000000000000');
    expect(toHex(bytesToConvert, 7)).toEqual('0x00000000000000');
    expect(toHex(bytesToConvert, 8)).toEqual('0x0000000000000000');

    bytesToConvert = Uint8Array.from([1]);
    expect(toHex(bytesToConvert)).toEqual('0x1');
    expect(toHex(bytesToConvert, 1)).toEqual('0x01');
    expect(toHex(bytesToConvert, 2)).toEqual('0x0001');
    expect(toHex(bytesToConvert, 3)).toEqual('0x000001');
    expect(toHex(bytesToConvert, 4)).toEqual('0x00000001');
    expect(toHex(bytesToConvert, 5)).toEqual('0x0000000001');
    expect(toHex(bytesToConvert, 6)).toEqual('0x000000000001');
    expect(toHex(bytesToConvert, 7)).toEqual('0x00000000000001');
    expect(toHex(bytesToConvert, 8)).toEqual('0x0000000000000001');
  });

  it('should toArray accept bytePadding config', () => {
    let numberToConvert: number;
    let hexToConvert: string;

    numberToConvert = 0;
    expect(toArray(numberToConvert)).toEqual(Uint8Array.from([0]));
    expect(toArray(numberToConvert, 1)).toEqual(Uint8Array.from([0]));
    expect(toArray(numberToConvert, 2)).toEqual(Uint8Array.from([0, 0]));
    expect(toArray(numberToConvert, 3)).toEqual(Uint8Array.from([0, 0, 0]));
    expect(toArray(numberToConvert, 4)).toEqual(Uint8Array.from([0, 0, 0, 0]));
    expect(toArray(numberToConvert, 5)).toEqual(Uint8Array.from([0, 0, 0, 0, 0]));
    expect(toArray(numberToConvert, 6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0]));
    expect(toArray(numberToConvert, 7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0]));
    expect(toArray(numberToConvert, 8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));

    numberToConvert = 1;
    expect(toArray(numberToConvert)).toEqual(Uint8Array.from([1]));
    expect(toArray(numberToConvert, 1)).toEqual(Uint8Array.from([1]));
    expect(toArray(numberToConvert, 2)).toEqual(Uint8Array.from([0, 1]));
    expect(toArray(numberToConvert, 3)).toEqual(Uint8Array.from([0, 0, 1]));
    expect(toArray(numberToConvert, 4)).toEqual(Uint8Array.from([0, 0, 0, 1]));
    expect(toArray(numberToConvert, 5)).toEqual(Uint8Array.from([0, 0, 0, 0, 1]));
    expect(toArray(numberToConvert, 6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 1]));
    expect(toArray(numberToConvert, 7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 1]));
    expect(toArray(numberToConvert, 8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]));

    hexToConvert = '0x0';
    expect(toArray(hexToConvert)).toEqual(Uint8Array.from([0]));
    expect(toArray(hexToConvert, 1)).toEqual(Uint8Array.from([0]));
    expect(toArray(hexToConvert, 2)).toEqual(Uint8Array.from([0, 0]));
    expect(toArray(hexToConvert, 3)).toEqual(Uint8Array.from([0, 0, 0]));
    expect(toArray(hexToConvert, 4)).toEqual(Uint8Array.from([0, 0, 0, 0]));
    expect(toArray(hexToConvert, 5)).toEqual(Uint8Array.from([0, 0, 0, 0, 0]));
    expect(toArray(hexToConvert, 6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0]));
    expect(toArray(hexToConvert, 7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0]));
    expect(toArray(hexToConvert, 8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));

    hexToConvert = '0x1';
    expect(toArray(hexToConvert)).toEqual(Uint8Array.from([1]));
    expect(toArray(hexToConvert, 1)).toEqual(Uint8Array.from([1]));
    expect(toArray(hexToConvert, 2)).toEqual(Uint8Array.from([0, 1]));
    expect(toArray(hexToConvert, 3)).toEqual(Uint8Array.from([0, 0, 1]));
    expect(toArray(hexToConvert, 4)).toEqual(Uint8Array.from([0, 0, 0, 1]));
    expect(toArray(hexToConvert, 5)).toEqual(Uint8Array.from([0, 0, 0, 0, 1]));
    expect(toArray(hexToConvert, 6)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 1]));
    expect(toArray(hexToConvert, 7)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 1]));
    expect(toArray(hexToConvert, 8)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1]));
  });

  it('should toNumber work when number is inside safe range and break when number provided is too big', () => {
    const maxSafeNumber = Number.MAX_SAFE_INTEGER;
    let maxSafe: BigNumberish | Uint8Array;
    let over: BigNumberish | Uint8Array;

    maxSafe = maxSafeNumber;
    over = Number.MAX_SAFE_INTEGER + 1;
    expect(toNumber(maxSafe)).toEqual(maxSafeNumber);
    expect(() => toNumber(over)).toThrow();

    maxSafe = '0x1fffffffffffff';
    over = '0x20000000000000';
    expect(toNumber(maxSafe)).toEqual(maxSafeNumber);
    expect(() => toNumber(over)).toThrow();

    maxSafe = Uint8Array.from([31, 255, 255, 255, 255, 255, 255]);
    over = Uint8Array.from([32, 0, 0, 0, 0, 0, 0]);
    expect(toNumber(maxSafe)).toEqual(maxSafeNumber);
    expect(() => toNumber(over)).toThrow();
  });

  it('should toArray break when value provided is bigger than bytePadding config', () => {
    let maxBytes: Uint8Array;
    let over: Uint8Array;

    maxBytes = Uint8Array.from([255]);
    over = Uint8Array.from([1, 0]);
    expect(toArray(maxBytes, 1)).toEqual(maxBytes);
    expect(() => toArray(over, 1)).toThrow();

    maxBytes = Uint8Array.from([255, 255]);
    over = Uint8Array.from([1, 0, 0]);
    expect(toArray(maxBytes, 2)).toEqual(maxBytes);
    expect(() => toArray(over, 2)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255]);
    over = Uint8Array.from([1, 0, 0, 0]);
    expect(toArray(maxBytes, 3)).toEqual(maxBytes);
    expect(() => toArray(over, 3)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255, 255]);
    over = Uint8Array.from([1, 0, 0, 0, 0]);
    expect(toArray(maxBytes, 4)).toEqual(maxBytes);
    expect(() => toArray(over, 4)).toThrow();
  });

  it('should toHex break when value provided is bigger than bytePadding config', () => {
    let maxBytes: Uint8Array;
    let maxHex: string;
    let over: Uint8Array;

    maxBytes = Uint8Array.from([255]);
    maxHex = '0xff';
    over = Uint8Array.from([1, 0]);
    expect(toHex(maxBytes, 1)).toEqual(maxHex);
    expect(() => toHex(over, 1)).toThrow();

    maxBytes = Uint8Array.from([255, 255]);
    maxHex = '0xffff';
    over = Uint8Array.from([1, 0, 0]);
    expect(toHex(maxBytes, 2)).toEqual(maxHex);
    expect(() => toHex(over, 2)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255]);
    maxHex = '0xffffff';
    over = Uint8Array.from([1, 0, 0, 0]);
    expect(toHex(maxBytes, 3)).toEqual(maxHex);
    expect(() => toHex(over, 3)).toThrow();

    maxBytes = Uint8Array.from([255, 255, 255, 255]);
    maxHex = '0xffffffff';
    over = Uint8Array.from([1, 0, 0, 0, 0]);
    expect(toHex(maxBytes, 4)).toEqual(maxHex);
    expect(() => toHex(over, 4)).toThrow();
  });
});
