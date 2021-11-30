import type { BytesLike, Bytes } from '@ethersproject/bytes';
import { joinSignature } from '@ethersproject/bytes';
import { hashMessage } from '@ethersproject/hash';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { SigningKey } from '@ethersproject/signing-key';
import type { Provider, TransactionRequest } from '@fuel-ts/providers';

const logger = new Logger('0.0.1');
export default class Wallet {
  readonly address: string;

  readonly provider?: Provider | null;

  // Wrapping the _signingKey and _mnemonic in a getter function prevents
  // leaking the private key in console.log; still, be careful! :)
  readonly signingKey: () => SigningKey;

  constructor(privateKey: BytesLike | SigningKey, provider?: Provider) {
    logger.checkNew(new.target, Wallet);

    if (SigningKey.isSigningKey(privateKey)) {
      if (privateKey.curve !== 'secp256k1') {
        logger.throwArgumentError(
          'unsupported curve; must be secp256k1',
          'privateKey',
          '[REDACTED]'
        );
      }
      this.signingKey = () => <SigningKey>privateKey;
    } else {
      // A lot of common tools do not prefix private keys with a 0x (see: #1166)
      if (typeof privateKey === 'string') {
        if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
          // eslint-disable-next-line no-param-reassign
          privateKey = `0x${privateKey}`;
        }
      }

      const signingKey = new SigningKey(privateKey);
      this.signingKey = () => signingKey;
    }

    this.address = sha256(this.signingKey().publicKey);
    this.provider = provider || null;
  }

  get privateKey(): string {
    return this.signingKey().privateKey;
  }

  get publicKey(): string {
    return this.signingKey().publicKey;
  }

  async signMessage(message: Bytes | string): Promise<string> {
    return joinSignature(this.signingKey().signDigest(hashMessage(message)));
  }

  async signTransaction(transaction: TransactionRequest): Promise<void> {
    // TODO: implement signTransaction
  }

  async sendTransaction(transaction: TransactionRequest): Promise<void> {
    // TODO: implement sendTransaction
  }
}
