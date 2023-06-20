/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyAccount, dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('struct-simple').connect(dummyId, dummyProvider);

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: {
            propC1: {
              propA1: {
                propB1: number;
              };
              propA2: number;
            };
          };
        };
        output: number;
      };
    }
  >
>;
