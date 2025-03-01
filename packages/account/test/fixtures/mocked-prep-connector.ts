import {
  type AccountSendTxParams,
  type TransactionRequest,
  transactionRequestify,
  type TransactionRequestLike,
  type TransactionResponse,
} from '../../src';

import { MockConnector } from './mocked-connector';

export class MockedPrepConnector extends MockConnector {
  override usePrepareForSend = true;

  override async prepareForSend(
    address: string,
    transaction: TransactionRequestLike
  ): Promise<TransactionRequest> {
    const wallet = this._wallets.find((w) => w.address.toString() === address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    const request = transactionRequestify(transaction);
    const signature = await wallet.signTransaction(request);
    request.updateWitnessByOwner(wallet.address, signature);

    return request;
  }

  override async sendTransaction(
    _address: string,
    _transaction: TransactionRequestLike,
    _params: AccountSendTxParams
  ): Promise<TransactionResponse> {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }
    return wallet.sendTransaction(_transaction, _params);
  }
}
