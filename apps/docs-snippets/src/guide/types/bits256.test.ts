import { Address, arrayify, getRandomB256, hexlify } from 'fuels';

describe(__filename, () => {
  it('should successfully generate and validate bit256 hexed string', () => {
    // #region bits256-1
    // #context import { getRandomB256 } from 'fuels';

    // randomB256 is a hexlified string representing a 256-bit value
    const randomB256: string = getRandomB256();
    // #endregion bits256-1

    expect(typeof randomB256 === 'string').toBeTruthy();
  });

  it('should successfully convert between hexed b256 and Uint8Array', () => {
    // #region bits256-2
    // #context import { arrayify, hexlify, getRandomB256 } from 'fuels';

    const randomB256: string = getRandomB256();

    // convert to Uint8Array
    const uint8Arr = arrayify(randomB256);

    // convert back to hexlified string
    const hexedB256 = hexlify(uint8Arr);
    // #endregion bits256-2

    expect(uint8Arr.length).toBe(32);
    expect(hexedB256).toEqual(randomB256);
  });

  it('should successfully address from b256', () => {
    // #region bits256-3
    // #context import { Address, getRandomB256 } from 'fuels';

    const randomB256: string = getRandomB256();

    const address = Address.fromB256(randomB256);

    expect(address.toB256()).toEqual(randomB256);
    // #endregion bits256-3
  });
});
