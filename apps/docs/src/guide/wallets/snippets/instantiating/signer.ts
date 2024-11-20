// #region signer-address
import { Signer } from 'fuels';

import { WALLET_PVT_KEY } from '../../env';

const signer = new Signer(WALLET_PVT_KEY);
// #endregion signer-address

console.log('Signer should be defined', signer);
