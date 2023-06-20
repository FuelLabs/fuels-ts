/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyAccount, dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('struct-with-array').connect(dummyId, dummyProvider);

type Aa = typeof contract.functions.main;

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: {
            prop1: [number, number];
            prop2: string;
          };
        };
        output: boolean;
      };
    }
  >
>;
