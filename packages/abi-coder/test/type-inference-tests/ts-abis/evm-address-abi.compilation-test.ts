/* eslint-disable @typescript-eslint/no-unused-vars */

import { Interface } from '../../../src';
import type { IsTrue } from '../../../src/type-inferrer/type-utilities';

import { evmAddressAbi } from './evm-address-abi';
import type { InfersAbiCorrectly } from './setup';

const abi = new Interface(evmAddressAbi.abi);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof abi.functions,
    {
      main: {
        input: {
          raw_address: string;
        };
        output: { value: string };
      };
    }
  >
>;
