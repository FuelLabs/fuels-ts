export type Filter<T, P> = T extends readonly [infer F, ...infer R]
  ? F extends P
    ? readonly [F, ...Filter<R, P>]
    : Filter<R, P>
  : readonly [];
export type Flatten<T> = T extends readonly []
  ? readonly []
  : T extends readonly [infer First, ...infer Rest]
  ? readonly [...Flatten<First>, ...Flatten<Rest>]
  : readonly [T];

// Convert [1, 2, 3] to 1 | 2 | 3
export type TupleToUnion<T extends readonly unknown[] | null | undefined> =
  T extends readonly (infer ITEMS)[] ? ITEMS : never;

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
  ? Equals<F, U> extends true
    ? Pass['length']
    : IndexOf<Rest, U, readonly [...Pass, F]>
  : -1;

// taken from https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-845655557
export type Equals<A, B> = _HalfEquals<A, B> extends true ? _HalfEquals<B, A> : false;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _HalfEquals<A, B> = (
  A extends unknown
    ? (
        B extends unknown
          ? A extends B
            ? B extends A
              ? keyof A extends keyof B
                ? keyof B extends keyof A
                  ? A extends object
                    ? _DeepHalfEquals<A, B, keyof A> extends true
                      ? 1
                      : never
                    : 1
                  : never
                : never
              : never
            : never
          : unknown
      ) extends never
      ? 0
      : never
    : unknown
) extends never
  ? true
  : false;

// eslint-disable-next-line @typescript-eslint/naming-convention
type _DeepHalfEquals<A, B extends A, K extends keyof A> = (
  K extends unknown ? (Equals<A[K], B[K]> extends true ? never : 0) : unknown
) extends never
  ? true
  : false;

export type IsTrue<T extends true> = T;

/**
 * UnionToIntersection\<\{ foo: string \} | \{ bar: string \}\> =
 *  \{ foo: string \} & \{ bar: string \}.
 */
type UnionToIntersection<U> = (U extends unknown ? (arg: U) => 0 : never) extends (
  arg: infer I
) => 0
  ? I
  : never;

/**
 * LastInUnion\<1 | 2\> = 2.
 */
type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (
  x: infer L
) => 0
  ? L
  : never;

/**
 * UnionToTuple\<1 | 2\> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

/**
 * ObjValuesTuple\<\{a: number, b: string\}\> = [number, string].
 */
export type ObjValuesTuple<
  T extends object,
  Keys extends unknown[] = UnionToTuple<keyof T>,
  R extends unknown[] = []
> = Keys extends [infer K, ...infer KT] ? ObjValuesTuple<T, KT, [...R, T[K & keyof T]]> : R;
