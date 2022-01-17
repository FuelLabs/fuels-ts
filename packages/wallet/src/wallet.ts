import type { BytesLike, Bytes } from '@ethersproject/bytes';
import { hexlify, stripZeros, arrayify, joinSignature } from '@ethersproject/bytes';
import { hashMessage } from '@ethersproject/hash';
import { keccak256 } from '@ethersproject/keccak256';
import { Logger } from '@ethersproject/logger';
import * as RLP from '@ethersproject/rlp';
import { sha256 } from '@ethersproject/sha2';
import { SigningKey } from '@ethersproject/signing-key';
import type { Provider, TransactionRequest } from '@fuel-ts/providers';
import { transactionFromRequest } from '@fuel-ts/providers';
import { TransactionCoder } from '@fuel-ts/transactions';

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

  async signTransaction(transactionRequest: TransactionRequest): Promise<string> {
    const encodedTransaction = hexlify(
      new TransactionCoder('transaction').encode(transactionFromRequest(transactionRequest))
    );
    const signature = this.signingKey().signDigest(keccak256(encodedTransaction));
    const raw: Array<string | Uint8Array> = [];

    // TODO: add correct order of fields to transaction
    raw.push(encodedTransaction);
    raw.push(stripZeros(arrayify(signature.v)));
    raw.push(stripZeros(arrayify(signature.r)));
    raw.push(stripZeros(arrayify(signature.s)));

    return RLP.encode(raw);
  }

  async sendTransaction(): Promise<void> {
    // TODO: implement sendTransaction
  }
}
