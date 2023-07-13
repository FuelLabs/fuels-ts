/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { arrayWithGenericsAbi } from './array-with-generics-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(arrayWithGenericsAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      simple: {
        input: {
          x: {
            prop1: [
              { prop1: { prop1: number; prop2: [boolean, boolean] }; prop2: string },
              { prop1: { prop1: number; prop2: [boolean, boolean] }; prop2: string }
            ];
          };
        };
        output: number;
      };
      with_generics: {
        input: {
          x: [
            {
              prop1: {
                prop1: number;
                prop2: [boolean, boolean];
              };
              prop2: string;
            },
            {
              prop1: {
                prop1: number;
                prop2: [boolean, boolean];
              };
              prop2: string;
            }
          ];
        };
        output: [
          {
            prop1: {
              prop1: number;
              prop2: [boolean, boolean];
            };
            prop2: string;
          },
          {
            prop1: {
              prop1: number;
              prop2: [boolean, boolean];
            };
            prop2: string;
          }
        ];
      };
    }
  >
>;
