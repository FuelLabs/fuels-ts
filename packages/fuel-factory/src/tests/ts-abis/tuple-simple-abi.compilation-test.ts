/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyAccount, dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('tuple-simple').connect(dummyId, dummyProvider);

type Aa = ReturnType<typeof contract.functions.tuple_params>;

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      single_param: {
        input: {
          x: {
            propC1: [
              number,
              {
                propA1: {
                  propB1: number;
                  propB2: [boolean, number];
                };
                propA2: string;
              }
            ];
          };
        };
        output: number;
      };
      tuple_params: {
        input: {
          x: [
            number,
            {
              propA1: {
                propB1: number;
                propB2: [boolean, number];
              };
              propA2: string;
            }
          ];
        };
        output: [
          number,
          {
            propA1: {
              propB1: number;
              propB2: [boolean, number];
            };
            propA2: string;
          }
        ];
      };
    }
  >
>;
