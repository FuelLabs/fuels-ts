import { TEST_BROWSER } from '@fuel-ts/utils/test-utils';
import { Address } from 'fuels';

describe(`${TEST_BROWSER} - ${__filename}`, () => {
  it('should successfully generate a bech32 address', () => {
    // #region bech32-2
    const address = Address.fromRandom();

    // #context console.log(address.bech32Address);

    // #context > fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
    // #endregion bech32-2
    expect(address.toAddress()).toMatch(/^fuel1/);
  });
});
