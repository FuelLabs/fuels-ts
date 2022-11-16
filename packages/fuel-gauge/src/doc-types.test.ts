import { Address, arrayify, hexlify, randomBytes, getRandomB256, ZeroBytes32 } from 'fuels';
import type { Bech32Address, Bytes } from 'fuels';

const PUBLIC_KEY =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const ADDRESS_B256 = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
const ADDRESS_BECH32: Bech32Address =
  'fuel1785jcs4epy625cmjuv9u269rymmwv6s6q2y9jhnw877nj2j08ehqce3rxf';
const ADDRESS_BYTES = new Uint8Array([
  241, 233, 44, 66, 185, 9, 52, 170, 99, 114, 227, 11, 197, 104, 163, 38, 246, 230, 106, 26, 2, 136,
  89, 94, 110, 63, 189, 57, 42, 79, 62, 110,
]);

test('it has an Address class using bech32Address', () => {
  // #region typedoc:Address-bech32
  // #context import { Address } from 'fuels';

  const address = new Address(ADDRESS_BECH32);

  expect(address.toB256()).toEqual(ADDRESS_B256);
  expect(address.toBytes()).toEqual(ADDRESS_BYTES);
  // Hex string values are equivalent to B256
  expect(address.toHexString()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has an Address class using public key', async () => {
  // #region typedoc:Address-publicKey
  const address = Address.fromPublicKey(PUBLIC_KEY);

  expect(address.toAddress()).toEqual(ADDRESS_BECH32);
  expect(address.toB256()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has an Address class using b256Address', async () => {
  // #region typedoc:Address-b256
  // #context import { Address } from 'fuels';
  const address = Address.fromB256(ADDRESS_B256);

  expect(address.toAddress()).toEqual(ADDRESS_BECH32);
  expect(address.toB256()).toEqual(ADDRESS_B256);
  // #endregion
});

test('it has Address tools', async () => {
  // #region typedoc:Address-utils
  // you can make a random address - useful for testing
  const address = Address.fromRandom();

  // you can it has a new Address from an ambiguous source that may be a Bech32 or B256 address
  const addressCloneFromBech = Address.fromString(address.toString());
  const addressCloneFromB256 = Address.fromString(address.toB256());

  // you can verify equality using the helper functions
  expect(address.equals(addressCloneFromBech)).toBeTruthy();
  expect(addressCloneFromBech.toString()).toEqual(addressCloneFromB256.toString());
  // #endregion
});

test('it has Bytes tools', async () => {
  // #region typedoc:byte32
  // #context import { ZeroBytes32, randomBytes } from 'fuels';

  const random32Bytes: Bytes = randomBytes(32);
  const random32BytesString: string = hexlify(randomBytes(32));
  const zeroed32Bytes: string = ZeroBytes32;

  // a byte32 array can be safely passed into arrayify more than once without mangling
  expect(arrayify(random32Bytes)).toEqual(arrayify(random32BytesString));

  // a byte32 string can be safely passed into hexlify more than once without mangling
  expect(zeroed32Bytes).toEqual(hexlify(zeroed32Bytes));
  // #endregion
});

test('it has b256 tools', async () => {
  // #region typedoc:b256
  // #context import { arrayify, hexlify, randomBytes, getRandomB256 } from 'fuels';

  // here are some useful ways to generate random b256 values
  const randomB256Bytes: Bytes = randomBytes(32);
  const randomB256: string = getRandomB256();

  // a [u8; 32] (Uint8Array) b256 can be converted to hex string
  const hexedB256: string = hexlify(randomB256Bytes);

  // a string b256 can be converted to Uint8Array
  expect(arrayify(randomB256Bytes)).toEqual(arrayify(hexedB256));

  // a string b256 can be safely passed into hexlify without mangling
  expect(randomB256).toEqual(hexlify(randomB256));
  // #endregion
});
