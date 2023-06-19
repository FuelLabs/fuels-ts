/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('fn-void').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: never;
        output: void;
      };
    }
  >
>;
