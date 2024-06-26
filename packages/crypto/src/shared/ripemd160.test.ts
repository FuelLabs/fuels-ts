import { bufferFromString } from '..';

import { ripemd160 as ripemd } from './ripemd160';

const data = bufferFromString('hashedKey');

vi.mock('@noble/hashes/ripemd160', () => ({
  ripemd160: vi.fn(() => data),
}));

/**
 * @group node
 */
describe('ripemd160', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('hashes using ripemd160', () => {
    const hashedKey = ripemd(data);

    expect(hashedKey).toEqual(data);
  });
});
