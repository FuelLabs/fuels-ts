import { transactionRequestify } from '../../src';
import type {
  TransactionRequestLike,
  AccountSendTxParams,
  ScriptTransactionRequest,
  TransactionStateFlag,
  TransactionResponse,
} from '../../src';

import { MockConnector } from './mocked-connector';

export class MockSendTransactionConnector extends MockConnector {
  override async sendTransaction(
    _address: string,
    _transaction: TransactionRequestLike,
    _params: AccountSendTxParams
  ): Promise<string | TransactionResponse> {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    const transaction = transactionRequestify(_transaction) as ScriptTransactionRequest;
    const flags: TransactionStateFlag = transaction.flag;

    // Fund
    if (flags.state !== 'funded') {
      await transaction.estimateAndFund(wallet);
    }

    // Sign
    if (!_params.skipCustomFee) {
      const signature = await wallet.signTransaction(transaction);
      await transaction.updateWitnessByOwner(wallet.address, signature);
    }

    // Send transaction and return as transaction response
    const response = await wallet.provider.sendTransaction(_transaction, _params);

    return response;
  }
}
