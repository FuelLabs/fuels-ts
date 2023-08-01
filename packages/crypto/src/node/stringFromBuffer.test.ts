import { stringFromBuffer } from './stringFromBuffer';

describe('stringFromBuffer', () => {
  it('should correctly convert Uint8Array to base64 string', () => {
    const array = new Uint8Array([0, 1, 2, 3, 4, 5]);
    const base64String = 'AAECAwQF';
    expect(stringFromBuffer(array)).toEqual(base64String);
  });

  it('should correctly convert Uint8Array to utf-8 string', () => {
    const array = new Uint8Array([104, 101, 108, 108, 111]); // represents 'hello'
    const utf8String = 'hello';
    expect(stringFromBuffer(array, 'utf-8')).toEqual(utf8String);
  });

  it('should correctly convert Uint8Array to hex string', () => {
    const array = new Uint8Array([255, 255, 255, 0]); // represents 'ffffff00'
    const hexString = 'ffffff00';
    expect(stringFromBuffer(array, 'hex')).toEqual(hexString);
  });
});
