import { bufferFromString } from '../../src/index.browser';

/**
 * @group browser
 */
describe('bufferFromString', () => {
  const buffer = new Uint8Array([104, 101, 108, 108, 111]); // ASCII values for "hello"

  it('should correctly convert string to Uint8Array with base64 encoding in a browser environment', () => {
    const string = 'aGVsbG8='; // "hello" in Base64
    const result = bufferFromString(string, 'base64');
    expect(result).toStrictEqual(buffer); // ASCII values for "hello"
  });

  it('should correctly convert string to Uint8Array with utf-8 encoding in a browser environment', () => {
    const string = 'hello';
    const result = bufferFromString(string, 'utf-8');
    expect(result).toStrictEqual(buffer); // ASCII values for "hello"
  });

  it('should correctly convert string to Uint8Array with hex encoding in a browser environment', () => {
    const string = '68656c6c6f'; // "hello" in Hex
    const result = bufferFromString(string, 'hex');
    expect(result).toStrictEqual(buffer); // ASCII values for "hello"
  });
});
