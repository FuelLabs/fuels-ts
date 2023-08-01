import { bufferFromString } from './bufferFromString';

describe('bufferFromString', () => {
  it('should correctly convert string to Uint8Array with base64 encoding', () => {
    const string = 'aGVsbG8='; // "hello" in Base64
    const result = bufferFromString(string, 'base64');
    expect(result).toEqual(new Uint8Array([104, 101, 108, 108, 111])); // ASCII values for "hello"
  });

  it('should correctly convert string to Uint8Array with utf-8 encoding', () => {
    const string = 'hello';
    const result = bufferFromString(string, 'utf-8');
    expect(result).toEqual(new Uint8Array([104, 101, 108, 108, 111])); // ASCII values for "hello"
  });

  it('should correctly convert string to Uint8Array with hex encoding', () => {
    const string = '68656c6c6f'; // "hello" in Hex
    const result = bufferFromString(string, 'hex');
    expect(result).toEqual(new Uint8Array([104, 101, 108, 108, 111])); // ASCII values for "hello"
  });
});
