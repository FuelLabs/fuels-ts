// #region full
import { Address } from 'fuels';

const address = Address.fromRandom();

const address1 = new Address(address.toString());
const address2 = new Address(address.toB256());

console.log('equals', address1.equals(address2));
// true
// #endregion full
