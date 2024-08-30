import { Address } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('Bech32 Types', () => {
  it('should successfully generate a bech32 address', () => {
    // #region bech32-2
    const address = Address.fromRandom();

    // #context console.log(address.bech32Address);

    // fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
    // #endregion bech32-2

    // #region addresses-1
    const bech32 = 'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
    // #endregion addresses-1
    expect(address.toAddress()).toMatch(/^fuel1/);
    expect(bech32).toEqual('fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs');
  });
});
