/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import type { InfersAbiCorrectly } from './setup';
import { structSimpleAbi } from './struct-simple-abi';

const abi = new Interface(structSimpleAbi.abi);

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
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
