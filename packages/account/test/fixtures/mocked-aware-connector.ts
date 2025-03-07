import { bn } from '@fuel-ts/math';
import { AccountSendTxParams, transactionRequestify, type TransactionRequestLike } from '../../src';

import { MockConnector } from './mocked-connector';

export class MockedAwareConnector extends MockConnector {
  override async baseTransaction(
    transaction: TransactionRequestLike
  ): Promise<TransactionRequestLike> {
    const currentTip = bn(transaction.tip);
    transaction.tip = currentTip.add(bn(1));

    return transaction;
  }

  override async prepareForSend(
    address: string,
    transaction: TransactionRequestLike
  ): Promise<TransactionRequestLike> {
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
  ) {
    const wallet = this._wallets.find((w) => w.address.toString() === _address);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }
    const { id } = await wallet.provider.sendTransaction(_transaction, _params);
    return id;
  }
}
