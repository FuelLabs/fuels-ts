// #region typedoc:Bech32-HRP
export type AccountAddress = `fuel${string}`;
// #endregion
export type ContractAddress = string;

export abstract class AbstractScript<T> {
  abstract bytes: Uint8Array;
  abstract encodeScriptData: (data: T) => Uint8Array;
}
