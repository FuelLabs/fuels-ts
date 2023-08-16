import type { Uint8ArrayWithDynamicData } from '../utilities';

import { BooleanCoder } from './boolean';
import { VecCoder } from './vec';

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

  it('should throw an error when decoding', () => {
    const coder = new VecCoder(new BooleanCoder());
    const invalidInput = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

    expect(() => coder.decode(invalidInput, 0)).toThrow('unexpected Vec decode');
  });
});
