// #region full
import { Address } from 'fuels';

const address = Address.fromRandom();

const addressClone = new Address(address);
// #endregion full

console.log('addressCloneFromB256', addressClone);
