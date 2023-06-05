enum Comparison {
  Lower,
  Equal,
  Greater,
}

type Comparator<
  A extends number | bigint,
  B extends number | bigint
> = `${A}` extends `-${infer AbsA}`
  ? `${B}` extends `-${infer AbsB}`
    ? ComparePositives<AbsB, AbsA>
    : Comparison.Lower
  : `${B}` extends `-${number}`
  ? Comparison.Greater
  : ComparePositives<`${A}`, `${B}`>;

// Compares two positive long numbers
type ComparePositives<
  A extends string,
  B extends string,
  ByLength = CompareByLength<A, B>
> = ByLength extends Comparison.Equal ? CompareByDigits<A, B> : ByLength;

// Compares two strings by length
type CompareByLength<A extends string, B extends string> = A extends `${infer AF}${infer AR}`
  ? B extends `${infer BF}${infer BR}`
    ? CompareByLength<AR, BR>
    : Comparison.Greater
  : B extends `${infer BF}${infer BR}`
  ? Comparison.Lower
  : Comparison.Equal;

// Compares two positive long numbers of the same length
type CompareByDigits<
  A extends string,
  B extends string
> = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
  ? CompareDigits<AF, BF> extends Comparison.Equal
    ? CompareByDigits<AR, BR>
    : CompareDigits<AF, BF>
  : Comparison.Equal;

// Compares two digits
type CompareDigits<A extends string, B extends string> = A extends B
  ? Comparison.Equal
  : '0123456789' extends `${string}${A}${string}${B}${string}`
  ? Comparison.Lower
  : Comparison.Greater;

type SafeGuard<
  Input extends number | bigint,
  NumberType extends string,
  MaxValue extends number | bigint
> = Comparator<Input, MaxValue> extends Comparison.Lower | Comparison.Equal
  ? Input
  : `inputted value must be <= ${MaxValue} (${NumberType})`;

type U8<Input extends number | bigint> = SafeGuard<Input, 'u8', 256>;
type U64<Input extends number | bigint> = SafeGuard<Input, 'u64', 18446744073709551615n>;

function takesu8<Input extends number | bigint>(input: U8<Input>) {
  return input;
}
