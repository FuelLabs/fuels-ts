/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Address } from '@fuel-ts/address';

export abstract class AbstractAccount {
  abstract address: Address;
  abstract provider: unknown;
  abstract getResourcesToSpend(quantities: any[], options?: any): any;
  abstract sendTransaction(transactionRequest: any, options?: any): any;
  abstract simulateTransaction(transactionRequest: any, options?: any): any;
  abstract getTransactionCost(transactionRequest: any, options?: any): Promise<any>;
  abstract fund(transactionRequest: any, txCost: any): Promise<any>;
}
