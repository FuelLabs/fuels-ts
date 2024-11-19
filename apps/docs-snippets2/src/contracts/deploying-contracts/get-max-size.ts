// #region full
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const {
  consensusParameters: {
    contractParameters: { contractMaxSize },
  },
} = provider.getChain();
// #endregion full

console.log('contractMaxSize', contractMaxSize);
