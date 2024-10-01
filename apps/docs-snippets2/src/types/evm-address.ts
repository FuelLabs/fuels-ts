import { Address, Provider, Wallet, type B256AddressEvm, type EvmAddress } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoEvmAddressFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoEvmAddressFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

const Bits256: B256AddressEvm =
  '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6';

// #region evm-address-1
let evmAddress: EvmAddress = {
  bits: Bits256,
};
// #endregion evm-address-1

// #region addresses-3
evmAddress = {
  bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
};
// #endregion addresses-3

// #region evm-address-2
const b256Address = '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const address = Address.fromB256(b256Address);

evmAddress = address.toEvmAddress();
// #endregion evm-address-2

// #region evm-address-3
evmAddress = {
  bits: Bits256,
};

const { value: value1 } = await contract.functions.echo_address_comparison(evmAddress).get();

expect(value1).toBeTruthy();
// #endregion evm-address-3

// #region evm-address-4
evmAddress = {
  bits: Bits256,
};

const { value: value2 } = await contract.functions.echo_address().get();

expect(value2).toEqual(evmAddress);
// #endregion evm-address-4
