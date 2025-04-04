import type {
  AccountSendTxParams,
  Predicate,
  TransactionRequestLike,
  TransactionResponse,
  AssembleTxParams,
  Provider,
  ScriptTransactionRequest,
} from 'fuels';
import { hexlify, transactionRequestify } from 'fuels';

import { PredicateSol } from '../../typegen';

import { MockConnector } from './mock-connector';

export class MockSolanaConnector extends MockConnector {
  override name = 'Mock Solana Connector';

  override async onBeforeAssembleTx(params: AssembleTxParams): Promise<AssembleTxParams> {
    const currentAccount = await this.currentAccount();
    const wallet = this._wallets.find((w) => w.address.toString() === currentAccount);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    const transaction = transactionRequestify(params.request) as ScriptTransactionRequest;
    const predicate = this.getPredicate(wallet.provider, currentAccount);
    return {
      ...params,
      feePayerAccount: predicate,
      request: transaction,
      estimatePredicates: false,
    };
  }

  override async sendTransaction(
    _address: string,
    _transaction: TransactionRequestLike,
    _params: AccountSendTxParams
  ): Promise<string | TransactionResponse> {
    const currentAccount = await this.currentAccount();
    const wallet = this._wallets.find((w) => w.address.toString() === currentAccount);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }
    const transaction = transactionRequestify(_transaction) as ScriptTransactionRequest;

    // Only index could have changed, so we need to re-populate the predicate data
    const index = transaction.addEmptyWitness();
    const predicate = this.getPredicate(wallet.provider, currentAccount, index);
    predicate.populateTransactionPredicateData(transaction);

    const chainId = await wallet.provider.getChainId();
    const txId = transaction.getTransactionId(chainId);
    const txIdEncoded = new TextEncoder().encode(txId);
    const message = hexlify(txIdEncoded).slice(2);
    const signature = await wallet.signMessage(message);
    transaction.updateWitness(index, signature);

    await wallet.provider.estimatePredicates(transaction);

    const response = await wallet.provider.sendTransaction(transaction, _params);

    return response;
  }

  private getPredicate(provider: Provider, address: string, index: number = 0): Predicate {
    return new PredicateSol({
      provider,
      data: [index],
      configurableConstants: {
        SIGNER: address,
      },
    });
  }

  public getPredicateAddress(provider: Provider, address: string): string {
    return this.getPredicate(provider, address).address.toString();
  }
}
