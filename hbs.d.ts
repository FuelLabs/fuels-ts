/**
 * This is a config-duplication of:
 *  /packages/abi-typegen/src/hbs.d.ts
 *
 * TODO: Keep all handlebars-related stuff inside `packages/abi-typegen`
 */
declare module '*.hbs' {
  const value: string;
  export default value;
}
