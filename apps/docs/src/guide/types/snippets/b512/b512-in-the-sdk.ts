// #region snippet-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.generate({ provider });

console.log('public key', wallet.publicKey);

// 0x97e3a666e4cd34b6b3cf778ef5ec617de4439b68f7a629245442a1fece7713094a1cb0aa7ad0ac253ca1ea47d4618f9090b2a881e829e091fb2c426763e94cca
// #endregion snippet-1
