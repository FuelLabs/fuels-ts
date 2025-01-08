// #region full
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const {
  consensusParameters: {
    contractParameters: { contractMaxSize },
  },
} = await provider.getChain();
// #endregion full

console.log('contractMaxSize', contractMaxSize);
