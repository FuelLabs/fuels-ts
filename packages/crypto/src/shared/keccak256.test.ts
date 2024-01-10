import { bufferFromString } from '..';

import { keccak256 as keccak } from './keccak256';

const data = bufferFromString('hashedKey');

vi.mock('ethereum-cryptography/keccak', () => ({
  keccak256: vi.fn(() => data),
}));

/**
 * @group node
 */
describe('keccak256', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using keccak256', () => {
    const hashedKey = keccak(data);

    expect(hashedKey).toEqual(data);
  });
});
