import { transactionRequestify } from '../../src';
import type {
  TransactionRequestLike,
  AccountSendTxParams,
  ScriptTransactionRequest,
} from '../../src';

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

    const transaction = transactionRequestify(_transaction) as ScriptTransactionRequest;
    const { skipCustomFee = false, onBeforeSend } = _params ?? {};
    if (skipCustomFee) {
      transaction.updateFlags({ isSigned: true });
    }

    const { isEstimated = false, isFunded = false, isSigned = false } = transaction.flags ?? {};

    // Fund
    if (isEstimated === false || isFunded === false) {
      await transaction.estimateAndFund(wallet);
    }

    // Sign
    if (isSigned === false) {
      const signature = await wallet.signTransaction(transaction);
      await transaction.updateWitnessByOwner(wallet.address, signature);
    }

    if (onBeforeSend) {
      await onBeforeSend(transaction);
    }

    // Send transaction
    const { id } = await wallet.provider.sendTransaction(_transaction, _params);
    return id;
  }
}
