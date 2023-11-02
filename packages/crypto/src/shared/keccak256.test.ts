import * as ethereumCryptography from 'ethereum-cryptography/keccak';

import { bufferFromString } from '..';

import { keccak256 } from './keccak256';

/**
 * @group node
 */
describe('keccak256', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using keccak256', () => {
    const data = bufferFromString('hashedKey');

    const mock = vi.spyOn(ethereumCryptography, 'keccak256').mockImplementationOnce(() => data);

    const hashedKey = keccak256(data);

    expect(mock).toBeCalledTimes(1);
    expect(hashedKey).toEqual(data);
  });
});
