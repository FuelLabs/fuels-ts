import type { BytesLike, SignatureLike } from '@ethersproject/bytes';
import { joinSignature, splitSignature, isBytesLike, arrayify } from '@ethersproject/bytes';
import { hashMessage } from '@ethersproject/hash';
import { keccak256 } from '@ethersproject/keccak256';
import * as RLP from '@ethersproject/rlp';
import { sha256 } from '@ethersproject/sha2';
import { SigningKey, recoverPublicKey, computePublicKey } from '@ethersproject/signing-key';

/**
 * Return a signed message using a key
 */
function signMessage(key: BytesLike | SigningKey, message: string): string {
  const signingKey = isBytesLike(key) ? new SigningKey(key) : key;
  const signature = signingKey.signDigest(hashMessage(message));
  return joinSignature(signature);
}

/**
 * Return the address of a signed message and signature
 */
function verifyMessage(message: BytesLike, signature: SignatureLike): string {
  const digest = hashMessage(message);
  const publicKey = recoverPublicKey(arrayify(digest), signature);
  return sha256(publicKey);
}

/**
 * Return the address of a signed transaction
 */
function verifyTransaction(signedTransaction: BytesLike): string {
  const tx = RLP.decode(arrayify(signedTransaction));

  // TODO: distruct transaction on a correct order of fields
  const publicKey = recoverPublicKey(keccak256(tx[0]), {
    r: tx[1],
    s: tx[2],
    recoveryParam: 0,
  });
  return sha256(publicKey);
}

export {
  signMessage,
  splitSignature,
  verifyMessage,
  computePublicKey,
  SigningKey,
  recoverPublicKey,
  verifyTransaction,
};
