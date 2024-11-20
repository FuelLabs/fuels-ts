// #region getMessageByNonce
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const nonce =
  '0x381de90750098776c71544527fd253412908dec3d07ce9a7367bd1ba975908a0';
const message = await provider.getMessageByNonce(nonce);
// #endregion getMessageByNonce

console.log('message', message);
