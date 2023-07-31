/**
 * Inspiration for this file was taken from the index.d.ts file of the library 'jest-extended'
 */
declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    /**
     * Use `.toThrowExact` when you want to check if an error is of a specific instance and check for deep, strict equality.
     */

    toThrowExact<T extends Error>(error: T): R;
  }

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any
  interface Expect extends Matchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface InverseAsymmetricMatchers extends Expect {}
}
