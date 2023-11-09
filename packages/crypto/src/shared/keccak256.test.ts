import { keccak256 as ethersKeccak256 } from 'ethereum-cryptography/keccak';

import { bufferFromString } from '..';

import { keccak256 as keccak } from './keccak256';

const data = bufferFromString('hashedKey');

/**
 * @group node
 */
describe('keccak256', () => {
  it('hashes using keccak256', () => {
    const hashedKey = keccak(data);

    expect(hashedKey).toEqual(ethersKeccak256(data));
  });
});
