// #region full
import { Address } from 'fuels';

const ADDRESS_BECH32 =
  'fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e';

const address = new Address(ADDRESS_BECH32);
// #endregion full

console.log('address', address);
