import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { ConfigurablePin } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

// #region set-predicate-new-data
const predicate = new ConfigurablePin({
  provider,
  data: [1000], // This is the initial set data
});

predicate.setData([1337]); // This is the new set data
// #endregion set-predicate-new-data
