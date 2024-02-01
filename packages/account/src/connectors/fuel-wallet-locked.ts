import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { TransactionRequestLike, TransactionResponse } from '@fuel-ts/providers';

import { WalletLocked } from '../wallets';

import type { FuelConnector } from './fuel-connector';
import type { FuelWalletProvider } from './fuel-wallet-provider';

export class FuelWalletLocked extends WalletLocked {
  connector: FuelConnector;
  _provider: FuelWalletProvider;

  constructor(
    address: string | AbstractAddress,
    connector: FuelConnector,
    provider: FuelWalletProvider
  ) {
    super(address, provider);
    this.connector = connector;
    this._provider = provider;
  }

  async signMessage(message: string): Promise<string> {
    return this.connector.signMessage(this.address.toString(), message);
  }

  async sendTransaction(transaction: TransactionRequestLike): Promise<TransactionResponse> {
    const transactionId = await this.connector.sendTransaction(
      this.address.toString(),
      transaction
    );
    return (<FuelWalletProvider>this.provider).getTransactionResponse(transactionId);
  }
}
