import { transactionRequestify } from '../../src';
import type {
  TransactionRequestLike,
  AccountSendTxParams,
  ScriptTransactionRequest,
  TransactionStatusFlag,
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
    const flags: TransactionStatusFlag = transaction.flags;

    // Fund
    if (flags.status !== 'funded' && flags.status !== 'signed') {
      await transaction.estimateAndFund(wallet);
    }

    // Sign
    if (flags.status !== 'signed') {
      const signature = await wallet.signTransaction(transaction);
      await transaction.updateWitnessByOwner(wallet.address, signature);
    }

    // Send transaction
    const { id } = await wallet.provider.sendTransaction(_transaction, _params);
    return id;
  }
}
