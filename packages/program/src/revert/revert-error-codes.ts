import { Logger } from '@ethersproject/logger';
import type { TransactionResultReceipt, TransactionResultRevertReceipt } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';

import type { RevertError } from './revert-error';
import { revertErrorFactory } from './revert-error';

const logger = new Logger(versions.FUELS);

const getRevertReceipts = (
  receipts: TransactionResultReceipt[]
): TransactionResultRevertReceipt[] =>
  receipts.filter((r) => r.type === ReceiptType.Revert) as TransactionResultRevertReceipt[];

export class RevertErrorCodes {
  private revertReceipts: TransactionResultRevertReceipt[];

  constructor(receipts: TransactionResultReceipt[]) {
    this.revertReceipts = getRevertReceipts(receipts);
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
      logger.warn(
        'Multiple revert receipts found, expected one. Receipts:',
        JSON.stringify(this.revertReceipts)
      );
    }

    return revertErrorFactory(this.revertReceipts[0]);
  }
}
