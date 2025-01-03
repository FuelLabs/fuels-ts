// #region predicate-multi-args-2
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { PredicateMultiArgs } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new PredicateMultiArgs({ provider, data: [20, 30] });
// #endregion predicate-multi-args-2

console.log('Predicate should be defined', predicate);
