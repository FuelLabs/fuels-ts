/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interface } from '../../src';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import type { InfersAbiCorrectly } from './setup';
import { tupleSimpleAbi } from './tuple-simple-abi';

const contract = new Interface(tupleSimpleAbi.abi);

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
