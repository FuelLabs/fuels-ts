import { scryptSync } from 'ethereum-cryptography/scrypt';

import { bufferFromString } from '..';
import type { IScryptParams } from '../types';

import { scrypt } from './scrypt';

/**
 * @group node
 */
describe('scrypt', () => {
  it('hashes using scrypt', () => {
    const password = bufferFromString('password');
    const salt = bufferFromString('salt');
    const dklen = 32;
    const n = 2;
    const p = 4;
    const r = 2;
    const params: IScryptParams = {
      dklen,
      n,
      p,
      password,
      r,
      salt,
    };

    const hashedKey = scrypt(params);

    expect(hashedKey).toEqual(scryptSync(password, salt, n, r, p, dklen));
  });
});
