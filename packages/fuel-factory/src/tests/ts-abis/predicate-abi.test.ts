/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { factory } from './setup';

const predicate = factory.predicates('predicate').createInstance();

type AbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    {
      setData: typeof predicate.setData;
    },
    {
      setData: {
        input: {
          received: {
            has_account: boolean;
            total_complete: number;
          };
        };
        output: never;
      };
    }
  >
>;
