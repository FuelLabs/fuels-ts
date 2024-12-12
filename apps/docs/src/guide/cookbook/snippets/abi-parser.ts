// #region full
import { AbiParser } from 'fuels';
import type { Abi, AbiSpecificationV1 } from 'fuels';

import someAbi from '../../../typegend/contracts/Counter-abi.json';

const parsedAbi: Abi = AbiParser.parse(someAbi as AbiSpecificationV1);
// #endregion full
console.log('Parsed ABI:', parsedAbi);
