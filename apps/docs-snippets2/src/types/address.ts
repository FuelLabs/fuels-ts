// #region full
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../env';

// #region address-3
const ADDRESS_BECH32 = 'fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e';

let address = new Address(ADDRESS_BECH32);

expect(address.toString()).toEqual(ADDRESS_BECH32);
expect(address.bech32Address).toEqual(ADDRESS_BECH32);
// #endregion address-3

const provider = await Provider.create(LOCAL_NETWORK_URL);

// #region address-4
const wallet = Wallet.generate({ provider });

address = Address.fromPublicKey(wallet.publicKey);

expect(address).toEqual(wallet.address);
// #endregion address-4

// #region address-5
const b256 = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

address = Address.fromB256(b256);

expect(address.toB256()).toEqual(b256);
// #endregion address-5

// #region address-6
address = Address.fromRandom();

let addressCloneFromBech = Address.fromString(address.toString());
let addressCloneFromB256 = Address.fromString(address.toB256());

expect(addressCloneFromBech.equals(addressCloneFromB256));
// #endregion address-6

// #region address-7
const dataFromInput: string = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

// if the input string can't be resolved this will throw an error
const someAddress = Address.fromDynamicInput(dataFromInput);

expect(someAddress).toBeTruthy();
// #endregion address-7

// #region address-8
address = Address.fromRandom();

addressCloneFromBech = Address.fromString(address.toString());
addressCloneFromB256 = Address.fromString(address.toB256());

expect(address.equals(addressCloneFromBech)).toBeTruthy();
expect(address.equals(addressCloneFromB256)).toBeTruthy();
// #endregion address-8
// #endregion full
