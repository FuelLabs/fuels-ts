// #region full
import { getRandomB256, Address } from 'fuels';

const randomB256: string = getRandomB256();

const address = Address.fromB256(randomB256);
// #endregion full

console.log('address', address);
