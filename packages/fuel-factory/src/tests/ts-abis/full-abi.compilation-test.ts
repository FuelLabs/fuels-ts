/* eslint-disable @typescript-eslint/no-unused-vars */

import type { IsTrue, JsonFlatAbi } from '@fuel-ts/abi-coder';

import type { InfersAbiCorrectly } from './setup';
import { dummyId, dummyProvider, factory } from './setup';

const contract = factory.contracts('full-abi').connect(dummyId, dummyProvider);

type FullAbiInferredCorrectly = IsTrue<
  InfersAbiCorrectly<
    typeof contract.functions,
    {
      types_u8: {
        input: { x: number };
        output: number;
      };
      types_u16: {
        input: { x: number };
        output: number;
      };

      types_u32: {
        input: { x: number };
        output: number;
      };
      types_u64: {
        input: { x: number };
        output: number;
      };
      types_str: { input: { x: string }; output: string };
      types_bool: {
        input: { x: boolean };
        output: boolean;
      };
      types_b256: {
        input: { x: string };
        output: string;
      };
      types_struct: {
        input: {
          x: { x: number; y: number; state: 'Checked' | 'Pending' };
        };
        output: { x: number; y: number; state: 'Checked' | 'Pending' };
      };

      types_array: {
        input: { x: [number, number, number] };
        output: [number, number, number];
      };
      types_enum: {
        input: { x: 'Checked' | 'Pending' };
        output: 'Checked' | 'Pending';
      };
      types_evm_address: {
        input: { x: { value: string } };
        output: { value: string };
      };
      types_option: {
        input: { x: number | undefined };
        output: number | undefined;
      };
      types_option_geo: {
        input: {
          x: { x: number; y: number; state: 'Checked' | 'Pending' } | undefined;
        };
        output: { x: number; y: number; state: 'Checked' | 'Pending' } | undefined;
      };
      types_tuple: {
        input: { x: [number, number, number] };
        output: [number, number, number];
      };
      types_vector_option: {
        input: {
          x: {
            multiple: [
              number | undefined,
              number | undefined,
              number | undefined,
              number | undefined,
              number | undefined
            ];
          }[];
        };
        output: {
          multiple: [
            number | undefined,
            number | undefined,
            number | undefined,
            number | undefined,
            number | undefined
          ];
        }[];
      };
      types_vector_geo: {
        input: { x: { x: number; y: number; state: 'Checked' | 'Pending' }[] };
        output: { x: number; y: number; state: 'Checked' | 'Pending' }[];
      };
      types_vector_u8: {
        input: { x: number[] };
        output: number[];
      };
    }
  >
>;
