import type { BytesLike } from '@ethersproject/bytes';
import type { Provider, TransactionRequest } from '@fuel-ts/providers';

import { hashMessage, hashTransaction } from './hasher';
import Signer from './signer';

export default class Wallet {
  readonly provider?: Provider | null;

  readonly signer: () => Signer;

  constructor(privateKey: BytesLike, provider?: Provider) {
    const signer = new Signer(privateKey);

    this.signer = () => signer;
    this.provider = provider || null;
  }

  get address(): string {
    return this.signer().address;
  }

  get privateKey(): string {
    return this.signer().privateKey;
  }

  get publicKey(): string {
    return this.signer().publicKey;
  }

  signMessage(message: string): string {
    return this.signer().sign(hashMessage(message));
  }

  signTransaction(transactionRequest: TransactionRequest): string {
    const hashedTransaction = hashTransaction(transactionRequest);
    const signature = this.signer().sign(hashedTransaction);

    return signature;
  }

  async sendTransaction(): Promise<void> {
    // TODO: implement sendTransaction
  }
}
