import { BigNumberCoder, Interface, type JsonAbi } from '@fuel-ts/abi-coder';
import { type Receipt, ReceiptType } from '@fuel-ts/transactions';
import { type BytesLike } from '@fuel-ts/utils';

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
   * Whether the log has been decoded
   */
  isDecoded: boolean;

  /**
   * The decoded data of the receipt
   */
  data?: T;
};

export class LogDecoder<const MainAbi extends JsonAbi = JsonAbi> {
  constructor(private readonly abis: { [key: string]: MainAbi }) {}

  /**
   * Decode logs from receipts
   * @param receipts - The receipts to decode
   * @returns The decoded logs
   */
  public decodeLogs<T = unknown>(receipts: Receipt[]): LogOutput<T>[] {
    return receipts.reduce((logs: LogOutput<T>[], receipt) => {
      if (receipt.type === ReceiptType.LogData || receipt.type === ReceiptType.Log) {
        const log: LogOutput<T> = {
          origin: receipt.id,
          type: receipt.type,
          logId: receipt.rb.toString(),
          raw:
            receipt.type === ReceiptType.Log
              ? new BigNumberCoder('u64').encode(receipt.ra)
              : receipt.data,
          isDecoded: false,
          data: undefined,
        };

        const isDecodable = Boolean(this.abis[receipt.id]);
        if (isDecodable) {
          try {
            const interfaceToUse = new Interface(this.abis[receipt.id]);
            const [decodedLog] = interfaceToUse.decodeLog(log.raw, log.logId);
            log.isDecoded = true;
            log.data = decodedLog as T;
          } catch (error) {}
        }

        logs.push(log);
      }

      return logs;
    }, []);
  }

  /**
   * Decode logs from receipts by type
   * @param receipts - The receipts to decode
   * @param type - The type of the logs to decode
   * @returns The decoded logs
   */
  decodeLogsByType<T = unknown>(receipts: Receipt[], type: LogType<MainAbi>) {
    const concreteIds = Object.values(this.abis)
      .flatMap((abi) => abi.concreteTypes)
      // Strip out the `struct ` and `enum ` keywords
      .map((log) => ({ ...log, type: log.type.replace('struct ', '').replace('enum ', '') }))
      .filter((log) => type === log.type)
      .map((log) => log.concreteTypeId);

    const loggedTypeIds = Object.values(this.abis)
      .flatMap((abi) => abi.loggedTypes)
      .filter((log) => concreteIds.includes(log.concreteTypeId))
      .map((log) => log.logId);

    const logs = this.decodeLogs<T>(receipts);
    return logs.filter((log) => loggedTypeIds.includes(log.logId));
  }
}
