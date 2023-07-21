import type { FunctionFragment } from '../../src';
import type { Equals } from '../../src/type-inferrer/type-utilities';

type TestInputAndOutput<
  Fn extends FunctionFragment,
  ExpectedInput,
  ExpectedOutput,
  IsValidInput = Equals<GetInputType<Fn>, ExpectedInput>,
  IsValidOutput = Equals<ExpectedOutput, GetOutputType<Fn>>
> = true extends IsValidInput
  ? true extends IsValidOutput
    ? true
    : "OUTPUTS don't match"
  : true extends IsValidOutput
  ? "INPUTS don't match"
  : "INPUTS & OUTPUTS don't match";

type MapErrors<T extends Record<string, true | string>> = {
  // @ts-expect-error K should only be string, but TS infers other types as well...
  [K in keyof T]: T[K] extends true ? never : `${K}: ${T[K]}`;
}[keyof T];

export type InfersAbiCorrectly<
  T extends Record<string, FunctionFragment>,
  Checks extends {
    [K in keyof T]: {
      input: unknown;
      output: unknown;
    };
  },
  Result extends Record<string, true | string> = {
    [Fn in keyof T]: TestInputAndOutput<T[Fn], Checks[Fn]['input'], Checks[Fn]['output']>;
  },
  HasErrors = Result[keyof Result] extends true ? 0 : true
> = HasErrors extends true ? MapErrors<Result> : true;

type GetOutputType<T extends FunctionFragment> = T extends FunctionFragment<
  infer _Input,
  infer Output
>
  ? Output
  : never;

type GetInputType<T extends FunctionFragment> = T extends FunctionFragment<
  infer Input,
  infer _Output
>
  ? Input
  : never;
