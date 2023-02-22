/* eslint-disable max-classes-per-file */
// #region typedoc:Bech32-HRP
export type Bech32Address = `fuel${string}`;
// #endregion
export type B256Address = string;

export abstract class AbstractScriptRequest<T> {
  abstract bytes: Uint8Array;
  abstract encodeScriptData: (data: T) => Uint8Array;
}

// #region typedoc:AbstractAddress
export abstract class AbstractAddress {
  abstract toJSON(): string;
  abstract toString(): string;
  abstract toAddress(): Bech32Address;
  abstract toB256(): B256Address;
  abstract toHexString(): string;
  abstract toBytes(): Uint8Array;
  abstract equals(other: AbstractAddress): boolean;
}
// #endregion

export abstract class AbstractAccount {
  abstract address: AbstractAddress;
  abstract provider: unknown;
  abstract getResourcesToSpend(quantities: any[], options?: any): any;
  abstract sendTransaction(transactionRequest: any): any;
  abstract simulateTransaction(transactionRequest: any): any;
}

export abstract class AbstractProgram {
  abstract wallet: AbstractAccount | null;
  abstract interface: {
    encodeFunctionData: (func: any, args: any[], offset: number, isMainArgs?: boolean) => any;
    decodeFunctionResult: (func: any, result: Uint8Array | string) => any;
    updateExternalLoggedTypes: (id: string, loggedTypes: any[]) => any;
    loggedTypes: any;
  };

  abstract provider: {
    sendTransaction(transactionRequest: any): any;
  } | null;
}

export abstract class AbstractContract extends AbstractProgram {
  abstract id: AbstractAddress;
}

export abstract class AbstractScript extends AbstractProgram {
  abstract bytes: Uint8Array;
}

export type AddressLike = AbstractAddress | AbstractAccount;

export type ContractIdLike = AbstractAddress | AbstractContract;

export abstract class AbstractPredicate {
  abstract bytes: Uint8Array;
  abstract address: AbstractAddress;
  abstract predicateData: Uint8Array;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract types?: ReadonlyArray<any>;
}
