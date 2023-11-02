import { bufferFromString } from '..';
import type { IScryptParams } from '../types';

import { scrypt } from './scrypt';

const data = bufferFromString('hashedKey');

vi.mock('ethereum-cryptography/scrypt', () => ({
  scryptSync: vi.fn(() => data),
}));

/**
 * @group node
 */
describe('scrypt', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using scrypt', () => {
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

    expect(hashedKey).toEqual(data);
  });
});
