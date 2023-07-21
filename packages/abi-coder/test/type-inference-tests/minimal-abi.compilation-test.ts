/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import { minimalAbi } from './minimal-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(minimalAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          x: string;
          y: string;
        };
        output: boolean;
      };
    }
  >
>;
