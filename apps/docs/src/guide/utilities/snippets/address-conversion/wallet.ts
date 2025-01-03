// #region conversion-3
import type { B256Address, WalletLocked } from 'fuels';
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const address = Address.fromB256(
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
);

const wallet: WalletLocked = Wallet.fromAddress(address, provider);

const b256: B256Address = wallet.address.toAddress();
// 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
// #endregion conversion-3

const expectedB256 =
  '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f';
console.log('b256 address should equal expected', b256 === expectedB256);
