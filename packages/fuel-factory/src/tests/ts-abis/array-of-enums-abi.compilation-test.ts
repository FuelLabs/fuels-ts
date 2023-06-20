/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('array-of-enums').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: { letters: ['a' | 'b' | 'c', 'a' | 'b' | 'c'] };
        };
        output: { letters: ['a' | 'b' | 'c', 'a' | 'b' | 'c'] };
      };
    }
  >
>;
