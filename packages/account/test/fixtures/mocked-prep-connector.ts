import { transactionRequestify, type TransactionRequestLike } from '../../src';

import { MockConnector } from './mocked-connector';

export class MockedPrepConnector extends MockConnector {
  override usePrepareForSend = true;

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
}
