/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TransactionResult } from '@fuel-ts/providers';

import { PANIC_REASONS, PANIC_DOC_URL } from './configs';

const getFailureReason = (reason: string): string =>
  PANIC_REASONS.includes(reason) ? reason : 'unknown';

export const getDocs = (
  status: TransactionResult<'failure'>['status']
): { doc: string; reason: string } => {
  if (status?.type === 'failure') {
    const reason = getFailureReason(status.reason);
    return {
      doc: reason !== 'unknown' ? `${PANIC_DOC_URL}#variant.${reason}` : PANIC_DOC_URL,
      reason,
    };
  }
  return { doc: PANIC_DOC_URL, reason: 'unknown' };
};

/**
 * Generic assert function to avoid undesirable errors
 */
export function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

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
  FUNC extends (...args: any[]) => any,
  ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type TupleToUnion<T extends readonly unknown[]> = T extends readonly (infer ITEMS)[]
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
  : `Inputted string has length ${LengthOfString<S>}, but it must be: str[${Length}]`;

type ValidExample = StringOfLength<'json', 4>;
type InvalidExapmple = StringOfLength<'xml', 4>;

function acceptsLength<S extends string>(myParam: StringOfLength<S, 4>) {}

const gg = acceptsLength('aaqw');

export type IndexOf<
  T extends readonly unknown[] | null,
  U,
  Pass extends readonly any[] = []
> = T extends null
  ? -1
  : T extends readonly [infer F, ...infer Rest]
  ? Equal<F, U> extends true
    ? Pass['length']
    : IndexOf<Rest, U, readonly [...Pass, F]>
  : -1;
