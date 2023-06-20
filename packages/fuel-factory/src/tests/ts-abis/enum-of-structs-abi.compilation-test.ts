/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ExpectExtends, ExpectValidArgs, IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('enum-of-structs').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: { rgb: { blue: number; green: number; red: number } };
        };
        output: { rgb: { blue: number; green: number; red: number } };
      };
    }
  >
>;
