/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Equals } from '@fuel-ts/abi-coder';
import type { FunctionInvocationScope } from '@fuel-ts/program';
import { Provider } from '@fuel-ts/providers';
import type { ScriptInvocationScope } from '@fuel-ts/script/src/script-invocation-scope';
import { Account } from '@fuel-ts/wallet';

import { FuelFactory } from '../../fuel-factory';
import { scriptAbi } from '../scriptAbi';

import { arrayOfEnumsAbi } from './array-of-enums-abi';
import { arrayWithGenericsAbi } from './array-with-generics-abi';
import { enumOfEnumsAbi } from './enum-of-enums-abi';
import { enumOfStructsAbi } from './enum-of-structs-abi';
import { enumSimpleAbi } from './enum-simple-abi';
import { enumSimpleNativeAbi } from './enum-simple-native-abi';
import { evmAddressAbi } from './evm-address-abi';
import { fnVoidAbi } from './fn-void-abi';
import { fullAbi } from './full-abi';
import { minimalAbi } from './minimal-abi';
import { minimalWithConfigurableAbi } from './minimal-with-configurable-abi';
import { optionSimpleAbi } from './option-simple-abi';
import { predicateAbi } from './predicate-abi';
import { structNestedAbi } from './struct-nested-abi';
import { structSimpleAbi } from './struct-simple-abi';
import { structWithArrayAbi } from './struct-with-array-abi';
import { tupleSimpleAbi } from './tuple-simple-abi';
import { vectorSimpleAbi } from './vector-simple-abi';

export const dummyProvider = new Provider('http://127.0.0.1:4000/graphql');
export const dummyId = 'fuel1efz7lf36w9da9jekqzyuzqsfrqrlzwtt3j3clvemm6eru8fe9nvqj5kar8';

export const dummyAccount = new Account(dummyId);

export const factory = new FuelFactory({
  contracts: [
    {
      name: 'enum-of-structs',
      program: enumOfStructsAbi,
    },
    {
      name: 'evm-address',
      program: evmAddressAbi,
    },
    {
      name: 'array-with-generics',
      program: arrayWithGenericsAbi,
    },
    {
      name: 'array-of-enums',
      program: arrayOfEnumsAbi,
    },
    {
      name: 'enum-of-enums',
      program: enumOfEnumsAbi,
    },
    {
      name: 'fn-void',
      program: fnVoidAbi,
    },
    {
      name: 'full-abi',
      program: fullAbi,
    },
    {
      name: 'enum-of-enums',
      program: enumOfEnumsAbi,
    },
    {
      name: 'struct-nested',
      program: structNestedAbi,
    },
    {
      name: 'struct-simple',
      program: structSimpleAbi,
    },
    {
      name: 'struct-with-array',
      program: structWithArrayAbi,
    },
    {
      name: 'tuple-simple',
      program: tupleSimpleAbi,
    },
    {
      name: 'vector-simple',
      program: vectorSimpleAbi,
    },
    {
      name: 'minimal',
      program: minimalAbi,
    },
    {
      name: 'minimal-with-configurable',
      program: minimalWithConfigurableAbi,
    },
    {
      name: 'option-simple',
      program: optionSimpleAbi,
    },
    {
      name: 'enum-simple',
      program: enumSimpleAbi,
    },
    {
      name: 'enum-simple-native',
      program: enumSimpleNativeAbi,
    },
  ],
  scripts: [
    {
      name: 'script',
      program: scriptAbi,
    },
  ],
  predicates: [
    {
      name: 'predicate',
      program: predicateAbi,
    },
  ],
});

type TestInputAndOutput<
  Fn extends (...args: any) => any,
  ExpectedInput,
  ExpectedOutput,
  IsValidInput = Equals<GetInputType<Fn>, ExpectedInput>,
  IsValidOutput = Equals<ExpectedOutput, GetReturnType<Fn>>
> = true extends IsValidInput
  ? true extends IsValidOutput
    ? true
    : "OUTPUTS don't match"
  : true extends IsValidOutput
  ? "INPUTS don't match"
  : "INPUTS & OUTPUTS don't match";

type MapErrors<T extends Record<string, any>> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  [K in keyof T]: T[K] extends true ? never : `${K}: ${T[K]}`;
}[keyof T];

export type InfersAbiCorrectly<
  T extends Record<string, (...args: any) => any>,
  Checks extends {
    [K in keyof T]: {
      input: any;
      output: any;
    };
  },
  Result extends Record<string, any> = {
    [Fn in keyof T]: TestInputAndOutput<T[Fn], Checks[Fn]['input'], Checks[Fn]['output']>;
  },
  HasErrors = Result[keyof Result] extends true ? 0 : true
> = HasErrors extends true ? MapErrors<Result> : true;

// eslint-disable @typescript-eslint/no-explicit-any
type GetReturnType<T extends (...args: any) => any> = ReturnType<T> extends
  | FunctionInvocationScope<infer _Input, infer Output>
  | ScriptInvocationScope<infer _Input, infer Output>
  ? Output
  : never;

// eslint-disable @typescript-eslint/no-explicit-any
type GetInputType<T extends (...args: any) => any> = ReturnType<T> extends
  | FunctionInvocationScope<infer Input, infer _Output>
  | ScriptInvocationScope<infer Input, infer _Output>
  ? Input
  : Parameters<T>[0];
