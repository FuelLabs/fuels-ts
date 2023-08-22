/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../src';
import type { Enum } from '../../src/type-inferrer/map-abi-enum';
import type { IsTrue } from '../../src/type-inferrer/type-utilities';

import { enumSimpleAbi } from './enum-simple-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(enumSimpleAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: { x: Enum<{ Checked: []; Pending: [] }> };
        output: Enum<{ Checked: []; Pending: [] }>;
      };
    }
  >
>;
