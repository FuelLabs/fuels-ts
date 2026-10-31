import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { ConfigurablePin } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);

// #region to-new-instance
const basePredicate = new ConfigurablePin({
  provider,
  data: [1000],
  configurableConstants: {
    PIN: 1337,
  },
});

// Create a new predicate instance with different data
const predicateWithNewData = basePredicate.toNewInstance({
  data: [2000],
});

// Create a new predicate instance with different configurable constants
const predicateWithNewConstants = basePredicate.toNewInstance({
  configurableConstants: {
    PIN: 9999,
  },
});

// Create a new predicate instance with both new data and configurable constants
const predicateWithBothOverrides = basePredicate.toNewInstance({
  data: [3000],
  configurableConstants: {
    PIN: 5555,
  },
});

// Create a copy with the same data and configurable constants
const predicateCopy = basePredicate.toNewInstance();
// #endregion to-new-instance
