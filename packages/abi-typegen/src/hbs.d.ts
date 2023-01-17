/**
 * This informs TS about Handlebar `.hbs` templates extension.
 * It is placed inside the `/packages/abi-typegen/src` dir, so
 * the Typegen package appropriately handles `.hbs` raw imports.
 *
 * However, it is also symlinked in the repo root and imported
 * inside the `<rootDir>/jest.env.ts`, so that Jest can process
 * these imports accordingly.
 */
declare module '*.hbs' {
  const value: string;
  export default value;
}
