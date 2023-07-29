/**
 * Inspiration for this file was taken from the index.d.ts file of the library 'jest-extended'
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    /**
     * Use `.toThrowExact` when you want to check if an error is of a specific instance and check for deep, strict equality.
     */

    toThrowExact<T extends Error>(error: T): R;
  }

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Expect extends Matchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface InverseAsymmetricMatchers extends Expect {}
}

// declare module 'jest-extended' {
//   const matchers: CustomMatchers<any>;
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   export = matchers;
// }
// // import 'jest-extended';
