// #region full
import { Address, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.generate({ provider });

const address = Address.fromPublicKey(wallet.publicKey);
// #endregion full

console.log('address', address);
