/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue, JsonFlatAbi } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('option-simple').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: number | undefined;
        };
        output: number | undefined;
      };
    }
  >
>;
