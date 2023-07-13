/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { fnVoidAbi } from './fn-void-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(fnVoidAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: never;
        output: void;
      };
    }
  >
>;
