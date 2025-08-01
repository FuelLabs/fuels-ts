import { BigNumberCoder, Interface, type JsonAbi } from '@fuel-ts/abi-coder';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
import { type Receipt, ReceiptType } from '@fuel-ts/transactions';
import { type BytesLike } from '@fuel-ts/utils';

import { type TransactionResultCallReceipt } from '../..';

type StripTypeKeywords<T extends string> = T extends `${'struct' | 'enum'} ${infer Rest}`
  ? Rest
  : T;

type ConcreteType<Abi extends JsonAbi> = Abi['concreteTypes'][number];
type LoggedType<Abi extends JsonAbi> = Abi['loggedTypes'][number];
type LogType<Abi extends JsonAbi> = StripTypeKeywords<
  Extract<ConcreteType<Abi>, { concreteTypeId: LoggedType<Abi>['concreteTypeId'] }>['type']
>;

type LogOutput<T = unknown> = {
  /**
   * The origin of the log
   * - For contracts, this will be the contract ID.
   * - For a script, this will be the script ID.
   */
  origin: string;

  /**
   * The log ID from the associated ABI.
   */
  logId: string;

  /**
   * The type of the receipt
   */
  type: ReceiptType.Log | ReceiptType.LogData;

  /**
   * The raw data of the receipt
   */
  raw: BytesLike;

  /**
   * The decoded data of the receipt
   */
  data: T;
};

export class LogDecoder<
  const Abi extends JsonAbi,
  const ExternalAbis extends Record<string, JsonAbi> = Record<string, JsonAbi>,
> {
  constructor(
    private readonly abi: Abi,
    private readonly externalAbis: ExternalAbis = {} as ExternalAbis
  ) {}

  public decodeLogs<T = unknown>(receipts: Receipt[]): LogOutput<T>[] {
    let mainContract = '';
    if (this.abi.programType === 'contract') {
      const firstCallReceipt = receipts.find(
        (r) => r.type === ReceiptType.Call && r.id === ZeroBytes32
      ) as TransactionResultCallReceipt;

      if (firstCallReceipt) {
        mainContract = firstCallReceipt.to;
      }
    }

    return receipts.reduce((logs: LogOutput<T>[], receipt) => {
      if (receipt.type === ReceiptType.LogData || receipt.type === ReceiptType.Log) {
        const isLogFromMainAbi = receipt.id === ZeroBytes32 || mainContract === receipt.id;
        const isDecodable = isLogFromMainAbi || this.externalAbis[receipt.id];

        if (isDecodable) {
          // Get the interface to use
          const interfaceToUse = isLogFromMainAbi
            ? new Interface(this.abi)
            : new Interface(this.externalAbis[receipt.id]);

          // Get the raw data of the log
          const raw =
            receipt.type === ReceiptType.Log
              ? new BigNumberCoder('u64').encode(receipt.ra)
              : receipt.data;

          // Decode the log
          const logId = receipt.rb.toString();
          const [decodedLog] = interfaceToUse.decodeLog(raw, logId);

          // Create the log output
          const log: LogOutput<T> = {
            origin: receipt.id,
            logId,
            type: receipt.type,
            raw,
            data: decodedLog,
          };

          logs.push(log);
        }
      }

      return logs;
    }, []);
  }

  decodeLogsByType<T = unknown>(receipts: Receipt[], type: LogType<Abi>[]) {
    const concreteIds = this.abi.concreteTypes
      .map((log) => ({ ...log, type: log.type.replace('struct ', '').replace('enum ', '') }))
      .filter((log) => type.includes(log.type as LogType<Abi>))
      .map((log) => log.concreteTypeId);
    const loggedTypeIds = this.abi.loggedTypes
      .filter((log) => concreteIds.includes(log.concreteTypeId))
      .map((log) => log.logId);

    const logs = this.decodeLogs<T>(receipts);
    return logs.filter((log) => loggedTypeIds.includes(log.logId));
  }
}
