import * as ethereumCryptography from 'ethereum-cryptography/scrypt';

import { bufferFromString } from '..';
import type { IScryptParams } from '../types';

import { scrypt } from './scrypt';

describe('scrypt', () => {
  afterEach(jest.restoreAllMocks);

  test('ensure scrypt function works just fine', () => {
    const mockedHashedKey = bufferFromString('hashedKey');

    const mock = jest
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
