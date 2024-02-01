import type { ProviderOptions } from '@fuel-ts/providers';
import { Provider, TransactionResponse } from '@fuel-ts/providers';

/**
 * TODO: We should add getTransactionResponse to TS-SDK in this way
 * a provider becomes self contained enabling connectors to implement
 * their on providers for customized responses.
 *
 * With the change we can remove the entire FuelWalletProvider.
 */
export class FuelWalletProvider extends Provider {
  static async create(
    url: string,
    options?: ProviderOptions | undefined
  ): Promise<FuelWalletProvider> {
    const provider = new FuelWalletProvider(url, options);
    await provider.fetchChainAndNodeInfo();
    return provider;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(transactionId: string): Promise<TransactionResponse> {
    return new TransactionResponse(transactionId, this);
  }
}
