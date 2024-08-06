import { WORD_SIZE } from '@fuel-ts/abi-coder';
import { arrayify } from '@fuel-ts/utils';

import { getLoaderInstructions } from './loader-script';

describe('Loader Script', () => {
  it('generates loader bytecode for a list of blob ids', () => {
    const blobIds = ['0x01', '0x02', '0x03'];
    const actual = getLoaderInstructions(blobIds);

    const expected = new Uint8Array([
      26, 64, 192, 0, 80, 65, 0, 48, 26, 88, 80, 0, 114, 76, 0, 3, 186, 69, 0, 0, 50, 64, 4, 65, 80,
      65, 0, 32, 89, 77, 48, 1, 119, 76, 0, 3, 32, 89, 99, 0, 82, 89, 96, 4, 74, 88, 0, 0, 1, 2, 3,
    ]);
    expect(actual).toStrictEqual(expected);

    // Checking loader bytes remains word sized
    const blobIdBytes = blobIds.map((b) => arrayify(b));
    const loaderBytes = actual.slice(0, actual.length - blobIdBytes.length);
    expect(loaderBytes.length % WORD_SIZE !== 0).toBe(false);
  });
});
