import { transactionRequestify } from '../../src';
import type {
  TransactionResponse,
  AccountSendTxParams,
  TransactionRequestLike,
  AssembleTxParams,
  ScriptTransactionRequest,
  Account,
} from '../../src';

import type { MockConnectorOptions } from './mocked-connector';
import { MockConnector } from './mocked-connector';

type MockedOtherAccountConnectorOptions = {
  otherAccount: Account;
} & MockConnectorOptions;

export class MockedOtherAccountConnector extends MockConnector {
  override name = 'Other Account Connector';
  private otherAccount: Account;

  constructor(options: MockedOtherAccountConnectorOptions) {
    const { otherAccount, ...rest } = options;
    super(rest);
    this.otherAccount = otherAccount;
  }

  override async onBeforeAssembleTx(params: AssembleTxParams): Promise<AssembleTxParams> {
    const currentAccount = await this.currentAccount();
    const wallet = this._wallets.find((w) => w.address.toString() === currentAccount);
    if (!wallet) {
      throw new Error('Wallet is not found!');
    }

    // Set the TX fee payer to the other account
    return { ...params, feePayerAccount: this.otherAccount };
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
    const transaction = transactionRequestify(_transaction) as ScriptTransactionRequest;
    const signature = await this.otherAccount.signTransaction(transaction);
    await transaction.updateWitnessByOwner(this.otherAccount.address, signature);

    const { id } = await provider.sendTransaction(_transaction, _params);
    return id;
  }
}
