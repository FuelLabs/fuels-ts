// #region full
import { Address } from 'fuels';

const ADDRESS_CHECKSUM =
  '0xcfe7b143Aca69a0984b481ab950716047586772586475AEE82fb10B719d52A76';

const ADDRESS_BECH32 =
  'fuel1elnmzsav56dqnp95sx4e2pckq36cvae9ser44m5zlvgtwxw49fmqd7e42e';

const address = new Address(ADDRESS_BECH32);
// #endregion full

console.log('address', address);
