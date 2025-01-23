import { WORD_SIZE } from '@fuel-ts/abi';

import { getContractChunks } from './utils';

/**
 * @group node
 * @group browser
 */
describe('getContractChunks', () => {
  it('splits bytecode into chunks', () => {
    const bytecode = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    const chunkSize = WORD_SIZE;
    const actual = getContractChunks(bytecode, chunkSize);

    const expected = [
      { id: 0, size: 8, bytecode: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]) },
      { id: 1, size: 8, bytecode: new Uint8Array([9, 10, 11, 12, 13, 14, 15, 16]) },
    ];
    expect(actual).toStrictEqual(expected);
  });

  it('pads chunks with zero bytes', () => {
    const bytecode = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const chunkSize = WORD_SIZE;
    const actual = getContractChunks(bytecode, chunkSize);

    const expected = [
      { id: 0, size: 8, bytecode: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]) },
      { id: 1, size: 8, bytecode: new Uint8Array([9, 0, 0, 0, 0, 0, 0, 0]) },
    ];

    expect(actual).toStrictEqual(expected);
  });
});
