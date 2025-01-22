// #region full
import { AbiParser } from 'fuels';
import type { Abi, AbiSpecificationV1 } from 'fuels';

import { Counter } from '../../../typegend';

const parsedAbi: Abi = AbiParser.parse(Counter.abi as AbiSpecificationV1);
// #endregion full
console.log('Parsed ABI:', parsedAbi);
