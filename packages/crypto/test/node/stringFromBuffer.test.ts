import { stringFromBuffer } from '../../src/index';
/**
 * @group node
 */
describe('stringFromBuffer', () => {
  const buffer = new Uint8Array([104, 101, 108, 108, 111]); // ASCII values for "hello"

  it('should correctly convert Uint8Array to string with base64 encoding in a node environment', () => {
    const result = stringFromBuffer(buffer, 'base64');
    expect(result).toEqual('aGVsbG8='); // "hello" in Base64
  });

  it('should correctly convert Uint8Array to string with utf-8 encoding in a node environment', () => {
    const result = stringFromBuffer(buffer, 'utf-8');
    expect(result).toEqual('hello');
  });

  it('should correctly convert Uint8Array to string with hex encoding in a node environment', () => {
    const result = stringFromBuffer(buffer, 'hex');
    expect(result).toEqual('68656c6c6f'); // "hello" in Hex
  });
});
