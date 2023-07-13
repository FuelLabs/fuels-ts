/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { enumSimpleNativeAbi } from './enum-simple-native-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(enumSimpleNativeAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          x: 'Checked' | 'Pending';
        };
        output: 'Checked' | 'Pending';
      };
    }
  >
>;
