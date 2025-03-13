import { bn } from '@fuel-ts/math';
import {
  transactionRequestify,
  type TransactionRequest,
  type TransactionRequestLike,
  Predicate,
  Provider,
  TransactionResponse,
  AccountSendTxParams,
} from '../../src';

import { MockConnector } from './mocked-connector';

// Predicate that takes a boolean and returns it
const predicateAbi = {
  programType: 'predicate',
  specVersion: '1',
  encodingVersion: '1',
  concreteTypes: [
    {
      type: 'bool',
      concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
    },
  ],
  metadataTypes: [],
  functions: [
    {
      inputs: [
        {
          name: 'value',
          concreteTypeId: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
        },
      ],
      name: 'main',
      output: 'b760f44fa5965c2474a3b471467a22c43185152129295af588b022ae50b50903',
      attributes: null,
    },
  ],
  loggedTypes: [],
  messagesTypes: [],
  configurables: [],
};
const predicateBytecode =
  '0x1af030007400000400000000000000b800000000000000b85dffc00110ffff001aec500071400003614502001349100076480006724800021345148076440001360000006141024a740000016141020c5c410000134500001a48000076440004134100401a48100076400001360000001ae9200020f8330058fbe00250fbe004740000021a43d0002440000095000003960800001aec50001a43a0001a47e0001af500001af9100098080000970000034af8000047000000';

export class MockedPredicateConnector extends MockConnector {
  override name = 'Predicate Connector';
  private predicate: Predicate | undefined;

  override async onBeforeEstimation(
    _transaction: TransactionRequestLike
  ): Promise<TransactionRequest> {
    const currentAccount = await this.currentAccount();
    const wallet = this._wallets.find((w) => w.address.toString() === currentAccount);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    const transaction = transactionRequestify(_transaction);
    const predicate = this.getPredicate(wallet.provider);

    return predicate.populateTransactionPredicateData(transaction);
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

    const provider = wallet.provider;
    const predicate = this.getPredicate(provider);
    const txRequest = predicate.populateTransactionPredicateData(_transaction);

    const { id } = await provider.sendTransaction(txRequest, _params);
    return id;
  }

  private getPredicate(provider: Provider): Predicate {
    if (!this.predicate) {
      this.predicate = new Predicate({
        abi: predicateAbi,
        bytecode: predicateBytecode,
        provider,
        data: [true],
      });
    }

    return this.predicate;
  }

  public getPredicateAddress(provider: Provider): string {
    return this.getPredicate(provider).address.toString();
  }
}
