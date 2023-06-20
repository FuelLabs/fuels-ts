/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('vector-simple').connect(dummyId, dummyProvider);

type Aa = typeof contract.functions.main;

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: number[];
        };
        output: number[];
      };
    }
  >
>;
