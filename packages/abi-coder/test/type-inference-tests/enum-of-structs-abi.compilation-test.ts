/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import { enumOfStructsAbi } from './enum-of-structs-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(enumOfStructsAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
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
