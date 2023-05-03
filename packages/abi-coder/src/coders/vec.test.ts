import BooleanCoder from './boolean';
import NumberCoder from './number';
import VecCoder from './vec';

describe('VecCoder', () => {
  it('should encode a Vec of Booleans', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    const actual = coder.encode([true, false]);

    expect(actual).toStrictEqual(expected);
  });

  it('should get encoded vector data', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.getEncodedVectorData([true, false]);

    expect(actual).toStrictEqual(expected);
  });

  it('should throw when encoding non array input', () => {
    const coder = new VecCoder(new BooleanCoder());

    expect(() => {
      coder.encode('Nope' as never);
    }).toThrow('expected array value');
  });

  it('should throw when getting encoded vector data with non array input', () => {
    const coder = new VecCoder(new BooleanCoder());

    expect(() => {
      coder.getEncodedVectorData('Nope' as never);
    }).toThrow('expected array value');
  });

  it('should get base offset', () => {
    const expected = 24;
    const actual = VecCoder.getBaseOffset();

    expect(actual).toBe(expected);
  });

  it.only('should decode a Vec of u8s', () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 56, 128, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7,
    ]);
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);

    const actual = coder.decode(input, 0);

    expect(actual).toStrictEqual(expected);
  });
});
