/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('enum-of-enums').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: { letter: 'a' | 'b' | 'c' };
        };
        output: { letter: 'a' | 'b' | 'c' };
      };
    }
  >
>;

const ggg = contract.functions.main({ x: { letter: 'a' } });
