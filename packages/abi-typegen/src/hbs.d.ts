/**
 * This informs TS about our Handlebar `.hbs` templates,
 * setting it as string.
 */
declare module '*.hbs' {
  const value: string;
  export default value;
}
