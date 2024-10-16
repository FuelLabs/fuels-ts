// #region full
import { Address } from 'fuels';

const dataFromInput: string =
  '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

// if the input string can't be resolved this will throw an error
const address = Address.fromDynamicInput(dataFromInput);
// #endregion full
console.log('address', address);
