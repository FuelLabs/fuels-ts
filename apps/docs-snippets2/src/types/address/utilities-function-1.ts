// #region full
import { Address } from 'fuels';

const address = Address.fromRandom();

const addressCloneFromBech = Address.fromString(address.toString());
const addressCloneFromB256 = Address.fromString(address.toB256());
// #endregion full

console.log('addressCloneFromBech', addressCloneFromBech);
console.log('addressCloneFromB256', addressCloneFromB256);
