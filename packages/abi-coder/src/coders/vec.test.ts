import type { Uint8ArrayWithDynamicData } from '../utilities';

import { BooleanCoder } from './boolean';
import { NumberCoder } from './number';
import { VecCoder } from './vec';

/**
 * @group node
 */
describe('VecCoder', () => {
  it('should encode a Vec of Booleans', () => {
    const coder = new VecCoder(new BooleanCoder());
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]),
    };

    const actual = coder.encode([true, false]);

    expect(actual).toEqual(expected);
  });

  it('should throw when encoding non array input', () => {
    const coder = new VecCoder(new BooleanCoder());

    expect(() => {
      coder.encode('Nope' as never);
    }).toThrow('expected array value');
  });

  it('should decode a u8 Vec', () => {
    const coder = new VecCoder(new NumberCoder('u8'));
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 41, 16, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
      8, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7,
    ]);
    const expected = [8, 6, 7];

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });
});
