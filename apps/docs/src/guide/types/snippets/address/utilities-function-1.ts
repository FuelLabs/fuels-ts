// #region full
import { Address } from 'fuels';

const address = Address.fromRandom();

const addressCloneFromB256 = Address.fromString(address.toB256());
// #endregion full

console.log('addressCloneFromB256', addressCloneFromB256);
