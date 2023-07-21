/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import { enumOfEnumsAbi } from './enum-of-enums-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(enumOfEnumsAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          x: { letter: 'a' | 'b' | 'c' };
        };
        output: { letter: 'a' | 'b' | 'c' };
      };
    }
  >
>;
