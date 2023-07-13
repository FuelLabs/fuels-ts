/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { arrayOfEnumsAbi } from './array-of-enums-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(arrayOfEnumsAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          x: { letters: ['a' | 'b' | 'c', 'a' | 'b' | 'c'] };
        };
        output: { letters: ['a' | 'b' | 'c', 'a' | 'b' | 'c'] };
      };
    }
  >
>;
