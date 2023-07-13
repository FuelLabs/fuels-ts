/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import type { InfersAbiCorrectly } from './setup';
import { structWithArrayAbi } from './struct-with-array-abi';

const contract = new Interface(structWithArrayAbi.abi);
type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      main: {
        input: {
          x: {
            prop1: [number, number];
            prop2: string;
          };
        };
        output: boolean;
      };
    }
  >
>;
