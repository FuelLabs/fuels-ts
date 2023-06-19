/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ExpectExtends, ExpectValidArgs, IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('enum-simple-native').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: 'Checked' | 'Pending';
        };
        output: 'Checked' | 'Pending';
      };
    }
  >
>;
