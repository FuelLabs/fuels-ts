/**
 * This informs TS about our Handlebar `.hbs` templates. It placed inside
 * the `/packages/abi-typegen/src` dir, so the `.hbs` imports are
 * properly handled by the Typegen package.
 *
 * However, it is also symlinked in the repo root, so Jest can
 * process these imports accordingly as well.
 */
declare module '*.hbs' {
  const value: string;
  export default value;
}
