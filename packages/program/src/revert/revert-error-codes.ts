import type { TransactionResultReceipt, TransactionResultRevertReceipt } from '@fuel-ts/account';
import { ReceiptType } from '@fuel-ts/transactions';

import type { RevertError } from './revert-error';
import { revertErrorFactory } from './revert-error';

const { warn } = console;

const getRevertReceipts = (
  receipts: TransactionResultReceipt[]
): TransactionResultRevertReceipt[] =>
  receipts.filter((r) => r.type === ReceiptType.Revert) as TransactionResultRevertReceipt[];

export class RevertErrorCodes {
  private revertReceipts: TransactionResultRevertReceipt[];
  private logs: Array<unknown>;

  constructor(receipts: TransactionResultReceipt[], logs: Array<unknown>) {
    this.revertReceipts = getRevertReceipts(receipts);
    this.logs = logs;
  }

  assert(detailedError: Error): void {
    const revertError = this.getError();
    if (revertError) {
      revertError.cause = detailedError;
      throw revertError;
    }
  }

  getError(): RevertError | undefined {
    if (!this.revertReceipts.length) {
      return undefined;
    }

    if (this.revertReceipts.length !== 1) {
      warn(
        'Multiple revert receipts found, expected one. Receipts:',
        JSON.stringify(this.revertReceipts)
      );
    }

    return revertErrorFactory(this.revertReceipts[0], this.logs);
  }
}
