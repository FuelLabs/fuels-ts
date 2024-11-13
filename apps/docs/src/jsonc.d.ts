// informs TS about `.jsonc` file extension
declare module '*.jsonc' {
  const value: string;
  export default value;
}
