/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ExpectExtends, ExpectValidArgs, IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('evm-address').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          raw_address: string;
        };
        output: { value: string };
      };
    }
  >
>;
