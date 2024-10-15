import { Address, Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 * @group browser
 */
describe('Address Types', () => {
  it('should successfully create new address from bech32 string', () => {
    // #region address-2
    const ADDRESS_BECH32 = 'fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e';
    const ADDRESS_CHECKSUM = '0xcfe7b143Aca69a0984b481ab950716047586772586475AEE82fb10B719d52A76';

    const address = new Address(ADDRESS_BECH32);

    expect(address.toString()).toEqual(ADDRESS_CHECKSUM);
    expect(address.bech32Address).toEqual(ADDRESS_BECH32);
    // #endregion address-2
  });

  it('should successfully generate new address instance from public key', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;
    // #region address-3
    const wallet = Wallet.generate({
      provider,
    });

    const address = Address.fromPublicKey(wallet.publicKey);

    expect(address).toEqual(wallet.address);
    // #endregion address-3
  });

  it('should successfully generate new address instance from 256 bit string', () => {
    // #region address-4
    const b256 = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

    const address = Address.fromB256(b256);

    expect(address.toB256()).toEqual(b256);
    // #endregion address-4
  });

  it('should successfully create address from Bech32 or B256 address', () => {
    // #region address-5
    const address = Address.fromRandom();

    const addressCloneFromBech = Address.fromString(address.toString());
    const addressCloneFromB256 = Address.fromString(address.toB256());

    expect(addressCloneFromBech.equals(addressCloneFromB256));
    // #endregion address-5
  });

  it('should successfully create address from an unknown input format', () => {
    // #region address-6
    const dataFromInput: string =
      '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

    // if the input string can't be resolved this will throw an error
    const someAddress = Address.fromDynamicInput(dataFromInput);

    expect(someAddress).toBeTruthy();
    // #endregion address-6
  });

  it('should successfully match address using equals method', () => {
    // #region address-7
    const address = Address.fromRandom();

    const addressCloneFromBech = Address.fromString(address.toString());
    const addressCloneFromB256 = Address.fromString(address.toB256());

    expect(address.equals(addressCloneFromBech)).toBeTruthy();
    expect(address.equals(addressCloneFromB256)).toBeTruthy();
    // #endregion address-7
  });
});
