/**
 * This informs TS about our Handlebar templates.
 *
 * This is needed for the `packages/abi-typegen` package.
 *
 * See also:
 *  1. /packages/abi-typegen/tsconfig.json
 *        It has a special:
 *          "require": ["./tsnode.hbs.js"]
 *
 *  2. /jest.config.ts
 *        It has a special transform:
 *          '.hbs': 'jest-text-transformer'
 */
declare module '*.hbs' {
  const value: string;
  export default value;
}
