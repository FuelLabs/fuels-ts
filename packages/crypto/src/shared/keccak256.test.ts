import * as ethereumCryptography from 'ethereum-cryptography/keccak';

import { resolveEnvAppropriateModules } from '../../test/utils';

import { keccak256 } from './keccak256';

/**
 * @group node
 */
describe('keccak256', async () => {
  const { bufferFromString } = await resolveEnvAppropriateModules();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using keccak256', () => {
    const data = bufferFromString('aGVsbG8='); // hello str
    const hashedKey = keccak256(data);
    expect(hashedKey).toEqual(ethereumCryptography.keccak256(data));
  });
});
