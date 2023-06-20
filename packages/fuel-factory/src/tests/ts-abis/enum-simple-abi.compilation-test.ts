/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Enum, ExpectExtends, ExpectValidArgs, IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('enum-simple').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: { x: Enum<{ Checked: []; Pending: [] }> };
        output: Enum<{ Checked: []; Pending: [] }>;
      };
    }
  >
>;
