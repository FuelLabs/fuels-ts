import * as ethereumCryptography from 'ethereum-cryptography/keccak';

import { bufferFromString } from '..';

import { keccak256 } from './keccak256';

/**
 * @group browser
 * @group node
 */
describe('keccak256', () => {
  afterEach(jest.restoreAllMocks);

  it('hashes using keccak256', () => {
    const data = bufferFromString('hashedKey');

    const mock = jest.spyOn(ethereumCryptography, 'keccak256').mockImplementationOnce(() => data);

    const hashedKey = keccak256(data);

    expect(mock).toBeCalledTimes(1);
    expect(hashedKey).toEqual(data);
  });
});
