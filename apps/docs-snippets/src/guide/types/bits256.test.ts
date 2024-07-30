import { Address, arrayify, getRandomB256, hexlify } from 'fuels';

/**
 * @group node
 * @group browser
 */
describe('Bits256 Types', () => {
  it('should successfully generate and validate bit256 hexed string', () => {
    // #region bits256-1
    // #import { getRandomB256 };

    // randomB256 is a hexlified string representing a 256-bit value
    const randomB256: string = getRandomB256();
    // 0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6
    // #endregion bits256-1

    // #region addresses-2
    const bits256 = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';
    // #endregion addresses-2

    expect(typeof randomB256 === 'string').toBeTruthy();
    expect(bits256).toBe('0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6');
  });

  it('should successfully convert between hexed b256 and Uint8Array', () => {
    // #region bits256-2
    // #import { arrayify, hexlify, getRandomB256 };

    const randomB256: string = getRandomB256();

    // convert to Uint8Array
    const uint8Arr = arrayify(randomB256);

    // convert back to hexlified string
    const hexedB256 = hexlify(uint8Arr);
    // #endregion bits256-2

    expect(uint8Arr.length).toBe(32);
    expect(hexedB256).toEqual(randomB256);
  });

  it('should successfully generate an address from a b256 string', () => {
    // #region bits256-3
    // #import { Address, getRandomB256 };

    const randomB256: string = getRandomB256();

    const address = Address.fromB256(randomB256);

    expect(address.toB256()).toEqual(randomB256);
    // #endregion bits256-3
  });
});
