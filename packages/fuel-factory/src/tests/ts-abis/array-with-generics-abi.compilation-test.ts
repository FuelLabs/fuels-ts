/* eslint-disable @typescript-eslint/no-unused-vars */

import type { Equal, Equals, ExpectExtends, ExpectValidArgs, IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('array-with-generics').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
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
