/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import type { InfersAbiCorrectly } from './setup';
import { vectorSimpleAbi } from './vector-simple-abi';

const abi = new Interface(vectorSimpleAbi.abi);

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          x: number[];
        };
        output: number[];
      };
    }
  >
>;
