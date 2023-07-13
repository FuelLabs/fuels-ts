/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { optionSimpleAbi } from './option-simple-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(optionSimpleAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
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
