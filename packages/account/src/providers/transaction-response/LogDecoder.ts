import { BigNumberCoder, Interface, type JsonAbi } from '@fuel-ts/abi-coder';
import { type Receipt, type ReceiptLog, type ReceiptLogData, ReceiptType } from '@fuel-ts/transactions';

type StripTypeKeywords<T extends string> = T extends `${'struct' | 'enum'} ${infer Rest}`
  ? Rest
  : T;

type ConcreteType<Abi extends JsonAbi> = Abi['concreteTypes'][number];
type LoggedType<Abi extends JsonAbi> = Abi['loggedTypes'][number];
type LogType<Abi extends JsonAbi> = StripTypeKeywords<Extract<ConcreteType<Abi>, { concreteTypeId: LoggedType<Abi>['concreteTypeId'] }>['type']>;

export class LogDecoder<const Abi extends JsonAbi> {
  private readonly interface: Interface;


  constructor(private readonly abi: Abi) {
    this.interface = new Interface(abi);
  }

  /**
   * Filter receipts by logged type id
   *
   * @param receipts - The receipts to filter
   * @param loggedTypeIds - The logged type ids to filter by
   * @returns The filtered logs
   */
  decodeLogsByLoggedTypeId<T = unknown>(receipts: Receipt[], loggedTypeIds: LoggedType<Abi>['logId'][]) {
    const logs: T[] = [];
    for (const r of receipts) {
      if ([ReceiptType.Log, ReceiptType.LogData].includes(r.type)) {
        const receipt = r as ReceiptLog | ReceiptLogData;

        // Only decode logs that match the loggedTypeId
        const logId = receipt.rb.toString();
        if (!loggedTypeIds.includes(logId)) {
          continue;
        }

        // Decode the log data
        const data =
          receipt.type === ReceiptType.Log
            ? new BigNumberCoder('u64').encode(receipt.ra)
            : receipt.data;
        const [decoded] = this.interface.decodeLog(data, logId);
        logs.push(decoded as T);
      }
    }
    return logs;
  }

  decodeLogsByType<T = unknown>(
    receipts: Receipt[],
    type: LogType<Abi>[]
  ) {
    const concreteIds = this.abi.concreteTypes
      .map((log) => ({ ...log, type: log.type.replace('struct ', '').replace('enum ', '') }))
      .filter((log) =>
        type.includes(
          log.type as LogType<Abi>
        )
      )
      .map((log) => log.concreteTypeId);
    const loggedTypeIds = this.abi.loggedTypes
      .filter((log) => concreteIds.includes(log.concreteTypeId))
      .map((log) => log.logId);

    return this.decodeLogsByLoggedTypeId<T>(receipts, loggedTypeIds);
  }
}
