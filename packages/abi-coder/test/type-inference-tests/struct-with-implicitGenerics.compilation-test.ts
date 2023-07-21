/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';
import { exhaustiveExamplesAbi } from '../fixtures/exhaustive-examples-abi';

import type { InfersAbiCorrectly } from './setup';

const abiInterface = new Interface(exhaustiveExamplesAbi);

type Fn = Pick<typeof abiInterface.functions, 'struct_with_implicitGenerics'>;

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    Fn,
    {
      struct_with_implicitGenerics: {
        input: {
          arg: {
            arr: [string, string, string];
            tuple: [string, number];
          };
        };
        output: number;
      };
    }
  >
>;
