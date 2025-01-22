// informs TS about Handlebar `.hbs` templates extension
declare module '*.hbs' {
  const value: string;
  export default value;
}
