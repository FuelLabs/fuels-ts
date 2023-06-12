/* eslint-disable @typescript-eslint/no-unused-vars */
import type { InputValue } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import VecCoder from './coders/vec';
import { OPTION_CODER_TYPE } from './constants';
import type { ParamType } from './fragments/param-type';

export function filterEmptyParams<T>(types: T): T;
export function filterEmptyParams(types: ReadonlyArray<string | ParamType>) {
  return types.filter((t) => (t as Readonly<ParamType>)?.type !== '()' && t !== '()');
}

export function hasOptionTypes<T>(types: T): T;
export function hasOptionTypes(types: ReadonlyArray<string | ParamType>) {
  return types.some((t) => (t as Readonly<ParamType>)?.type === OPTION_CODER_TYPE);
}

type ByteInfo = { vecByteLength: number } | { byteLength: number };
export function getVectorAdjustments(
  coders: Coder<unknown, unknown>[],
  values: InputValue[],
  offset = 0
) {
  const vectorData: Uint8Array[] = [];
  const byteMap: ByteInfo[] = coders.map((encoder, i) => {
    if (!(encoder instanceof VecCoder)) {
      return { byteLength: encoder.encodedLength };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = encoder.getEncodedVectorData(values[i] as any);
    vectorData.push(data);
    return { vecByteLength: data.byteLength };
  });

  if (!vectorData.length) {
    return vectorData;
  }

  const baseVectorOffset = vectorData.length * VecCoder.getBaseOffset() + offset;
  const offsetMap = coders.map((encoder, paramIndex) => {
    if (!(encoder instanceof VecCoder)) {
      return 0;
    }

    return byteMap.reduce((sum, byteInfo, byteIndex) => {
      // non-vector data
      if ('byteLength' in byteInfo) {
        return sum + byteInfo.byteLength;
      }

      // account for preceding vector data earlier in input list
      if (byteIndex < paramIndex) {
        return sum + byteInfo.vecByteLength;
      }

      return sum;
    }, baseVectorOffset);
  });

  coders.forEach((code, i) => code.setOffset(offsetMap[i]));
  return vectorData;
}

export type ReplaceValues<T, NewValues extends Record<string, unknown>> = Omit<
  T,
  keyof NewValues
> & {
  readonly [K in keyof NewValues]: NewValues[K];
};

export type IndexOf<
  T extends readonly unknown[] | null,
  U,
  Pass extends readonly unknown[] = []
> = T extends null
  ? -1
  : T extends readonly [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? Pass['length']
    : IndexOf<Rest, U, readonly [...Pass, F]>
  : -1;

export type Expect<T extends true> = T;
export type ExpectTrue<T extends true> = T;
export type ExpectFalse<T extends false> = T;
export type IsTrue<T extends true> = T;
export type IsFalse<T extends false> = T;

export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false;
export type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
export type IsAny<T> = 0 extends 1 & T ? true : false;
export type NotAny<T> = true extends IsAny<T> ? false : true;

export type Debug<T> = { [K in keyof T]: T[K] };
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T;

export type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

export type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE ? true : false;
export type ExpectValidArgs<
  FUNC extends (...args: unknown[]) => unknown,
  ARGS extends unknown[]
> = ARGS extends Parameters<FUNC> ? true : false;

export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type TupleToUnion<T extends readonly unknown[] | null> = T extends readonly (infer ITEMS)[]
  ? ITEMS
  : never;
export type Filter<T, Condition> = T extends Condition ? T : never;

// tail-end recursive approach: returns the type itself to reuse stack of previous call
type LengthOfString<S extends string, Acc extends 0[] = []> = S extends `${string}${infer $Rest}`
  ? LengthOfString<$Rest, [...Acc, 0]>
  : Acc['length'];

export type StringOfLength<
  S extends string,
  Length extends number
> = LengthOfString<S> extends Length
  ? S
  : `Inputted string length: ${LengthOfString<S>} | required is: 4. (str[${Length}])`;

type ValidExample = StringOfLength<'json', 4>;
type InvalidExapmple = StringOfLength<'xml', 4>;

function acceptsLength<I extends string>(myParam: StringOfLength<I, 4>) {}

const gg = acceptsLength('qqqq');

type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never;

export type UnionToReadonlyTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? readonly []
  : readonly [...UnionToReadonlyTuple<Exclude<U, Last>>, Last];

export function mapArgsIntoArray<TArgs extends unknown[] | object>(
  orderedArgNames: string[],
  args: TArgs
): TArgs {
  if (Array.isArray(args)) return args;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (args === undefined) return [];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Object.entries(args)
    .sort((a, b) => orderedArgNames!.indexOf(a[0]) - orderedArgNames!.indexOf(b[0]))
    .map((x) => x[1]);
}
