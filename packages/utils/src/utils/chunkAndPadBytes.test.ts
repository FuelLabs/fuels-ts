import { arrayify } from '../index';

import { chunkAndPadBytes } from './chunkAndPadBytes';

/**
 * @group node
 */
describe('chunkAndPadBytes', () => {
  it('can chunk and pad bytes to 16 KiB', () => {
    const bytes = arrayify(
      '0x900000044700000000000000000000345dfcc00110fff3005d4060495d47f000134904407348000c72f0007b36f0000024040000000000002151bd4b'
    );
    const chunkSize = 16 * 1024;

    const actual = chunkAndPadBytes(bytes, chunkSize);
    const expected = [
      new Uint8Array([
        144, 0, 0, 4, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 93, 252, 192, 1, 16, 255, 243, 0, 93,
        64, 96, 73, 93, 71, 240, 0, 19, 73, 4, 64, 115, 72, 0, 12, 114, 240, 0, 123, 54, 240, 0, 0,
        36, 4, 0, 0, 0, 0, 0, 0, 33, 81, 189, 75, 0, 0, 0, 0,
      ]),
    ];

    expect(actual).toEqual(expected);
  });
});
