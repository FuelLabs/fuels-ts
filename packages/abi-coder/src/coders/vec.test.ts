import BooleanCoder from './boolean';
import VecCoder from './vec';

describe('VecCoder', () => {
  it('should encode a Vec of Numbers', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    const actual = coder.encode([true, false]);

    expect(actual).toStrictEqual(expected);
  });

  it('should get encoded vector data offset', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.getEncodedVectorData([true, false]);

    expect(actual).toStrictEqual(expected);
  });

  it('should get base offset', () => {
    const expected = 24;
    const actual = VecCoder.getBaseOffset();

    expect(actual).toBe(expected);
  });

  it('should throw an error when decoding', () => {
    const coder = new VecCoder(new BooleanCoder());
    const invalidInput = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

    expect(() => coder.decode(invalidInput, 0)).toThrow('unexpected Vec decode');
  });
});
