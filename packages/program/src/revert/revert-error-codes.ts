import { Logger } from '@ethersproject/logger';
import type { TransactionResultReceipt, TransactionResultRevertReceipt } from '@fuel-ts/providers';
import { ReceiptType } from '@fuel-ts/transactions';
import { versions } from '@fuel-ts/versions';

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

  hasReverts(): boolean {
    return !!this.revertReceipts.length;
  }

  throwError(contextMessage: string) {
    if (this.hasReverts()) {
      if (this.revertReceipts.length !== 1) {
        logger.warn('Multiple revert receipts found, full list:', this.toString());
      }

      throw revertErrorFactory(this.revertReceipts[0], contextMessage);
    }
  }
}
