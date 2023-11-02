import * as ethereumCryptography from 'ethereum-cryptography/scrypt';

import { bufferFromString } from '..';
import type { IScryptParams } from '../types';

import { scrypt } from './scrypt';

/**
 * @group node
 */
describe('scrypt', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using scrypt', () => {
    const mockedHashedKey = bufferFromString('hashedKey');

    const mock = vi
      .spyOn(ethereumCryptography, 'scryptSync')
      .mockImplementationOnce(() => mockedHashedKey);

    const password = bufferFromString('password');
    const salt = bufferFromString('salt');

    const params: IScryptParams = {
      dklen: 32,
      n: 2,
      p: 4,
      password,
      r: 2,
      salt,
    };

    const hashedKey = scrypt(params);

    expect(mock).toBeCalledTimes(1);
    expect(hashedKey).toEqual(mockedHashedKey);
  });
});
