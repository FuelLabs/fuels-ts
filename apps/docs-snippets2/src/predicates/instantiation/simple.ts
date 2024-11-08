// #region predicate-simple-2
import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';
import { ReturnTruePredicate } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new ReturnTruePredicate({
  provider,
});
// #endregion predicate-simple-2

console.log('Predicate should be defined', predicate);
