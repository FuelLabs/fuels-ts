/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyAccount, factory } from './setup';

const script = factory.scripts('script').createInstance(dummyAccount);

type Asd = typeof script.functions.main;

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof script.functions,
    {
      main: {
        input: { myInput: boolean };
        output: void;
      };
    }
  >
>;
