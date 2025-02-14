import { transactionRequestify, isTransactionTypeScript } from '../../src';
import type { TransactionRequestLike, TransactionCost, AccountSendTxParams } from '../../src';

import { MockConnector } from './mocked-connector';

export class MockSendTransactionConnector extends MockConnector {
  override async sendTransaction(
    _address: string,
    _transaction: TransactionRequestLike,
    _params: AccountSendTxParams
  ) {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    const transaction = transactionRequestify(_transaction);
    const { isEstimated = false, isFunded = false, isSigned = false } = transaction.flags ?? {};

    // Estimate
    let txCost: TransactionCost | undefined;
    if (isEstimated === false) {
      txCost = await wallet.getTransactionCost(transaction);
      transaction.maxFee = txCost.maxFee;
      if (isTransactionTypeScript(transaction)) {
        transaction.gasLimit = txCost.gasUsed;
      }
    }

    // Fund
    if (isFunded === false) {
      txCost = txCost ?? (await wallet.getTransactionCost(transaction));
      await wallet.fund(transaction, txCost);
    }

    // Sign
    if (isSigned === false) {
      const signature = await wallet.signTransaction(transaction);
      await transaction.updateWitnessByOwner(wallet.address, signature);
    }

    // Send transaction
    const { id } = await wallet.provider.sendTransaction(_transaction, _params);
    return id;
  }
}
