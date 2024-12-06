import 'vitest';

interface CustomMatchers<R = unknown> {
  toEqualBn: (bn: string | number) => R;
}

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface ExpectStatic extends CustomMatchers {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
