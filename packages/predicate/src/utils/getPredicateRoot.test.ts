import { getBytesCopy } from 'ethers';

import { getPredicateRoot } from './getPredicateRoot';

describe('getPredicateRoot', () => {
  it('should return the correct predicate root', () => {
    const predicateBytes = getBytesCopy(
      '0x740000034700000000000000000000805dfcc00110fff3001aec5000910000207144000361491200764800026141120c74000007724c0002134924c05a492001764800026141124a74000001240000005c450000504900085c43f0001341044076400001740000055d43f005104103007244002028ed0440a1412ee0244000000a0000000000000038966262edb5997574be45f94c665aedb41a1663f5b0528e765f355086eebf960000000000000088'
    );

    const predicateRoot = getPredicateRoot(predicateBytes);

    const expectedPredicateRoot =
      '0xd8fe10a7e398a8af7235e0a7d43388179d89c59d521dcf314e7ee407af8cddce';

    expect(predicateRoot).toEqual(expectedPredicateRoot);
  });
});
