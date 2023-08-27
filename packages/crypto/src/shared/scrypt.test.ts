import * as ethereumCryptography from 'ethereum-cryptography/scrypt';

import { resolveEnvAppropriateModules } from '../../test/utils';
import type { IScryptParams } from '../types';

import { scrypt } from './scrypt';

/**
 * @group node
 * @group browser
 */
describe('scrypt', async () => {
  const { bufferFromString } = await resolveEnvAppropriateModules();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using scrypt', async () => {
    const password = bufferFromString('password');
    const salt = bufferFromString('salt');
    const dklen = 32;
    const n = 2;
    const p = 4;
    const r = 2;

    const params: IScryptParams = {
      password,
      salt,
      dklen,
      n,
      p,
      r,
    };

    const hashedKey = scrypt(params);

    const expectedKey = await ethereumCryptography.scrypt(password, salt, n, r, p, dklen);

    expect(hashedKey).toEqual(expectedKey);
  });
});
