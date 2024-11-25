// #region conversion-3
import type { Bech32Address, WalletLocked } from 'fuels';
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const address = Address.fromB256(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const wallet: WalletLocked = Wallet.fromAddress(address, provider);

const bech32: Bech32Address = wallet.address.toAddress();
// fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs
// #endregion conversion-3

const expectedBech32 =
  'fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs';
console.log('Bech32 address should equal expected', bech32 === expectedBech32);
