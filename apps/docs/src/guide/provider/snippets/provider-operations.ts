// #region operations
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

// Create the provider
const provider = await Provider.create(LOCAL_NETWORK_URL);

const chain = await provider.operations.getChain();
const nodeInfo = await provider.operations.getNodeInfo();
// #endregion operations

console.log('provider', provider);
console.log('chain', chain);
console.log('nodeInfo', nodeInfo);
