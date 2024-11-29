// #region predicate-main-args-struct-2
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { PredicateMainArgsStruct } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new PredicateMainArgsStruct({
  provider,
  data: [{ has_account: true, total_complete: 100 }],
});

// #endregion predicate-main-args-struct-2

console.log('Predicate should be defined', predicate);
