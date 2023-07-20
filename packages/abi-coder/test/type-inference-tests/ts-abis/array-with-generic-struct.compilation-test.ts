import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';
import { exhaustiveExamplesAbi } from '../../fixtures/exhaustive-examples-abi';

import type { InfersAbiCorrectly } from './setup';

const abiInterface = new Interface(exhaustiveExamplesAbi);

type Fn = Pick<typeof abiInterface.functions, 'array_with_generic_struct'>;

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    Fn,
    {
      array_with_generic_struct: {
        input: {
          arg: {
            a: [
              {
                bim: string;
                bam: {
                  propB1: number;
                };
                bom: {
                  propA1: number;
                  propA2: string;
                };
              },
              {
                bim: string;
                bam: {
                  propB1: number;
                };
                bom: {
                  propA1: number;
                  propA2: string;
                };
              },
              {
                bim: string;
                bam: {
                  propB1: number;
                };
                bom: {
                  propA1: number;
                  propA2: string;
                };
              }
            ];
          };
        };
        output: void;
      };
    }
  >
>;
