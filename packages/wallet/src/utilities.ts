import type { BytesLike, SignatureLike } from '@ethersproject/bytes';
import { joinSignature, splitSignature, isBytesLike, arrayify } from '@ethersproject/bytes';
import { hashMessage } from '@ethersproject/hash';
import { sha256 } from '@ethersproject/sha2';
import { SigningKey, recoverPublicKey, computePublicKey } from '@ethersproject/signing-key';

function signMessage(key: BytesLike | SigningKey, message: string): string {
  const signingKey = isBytesLike(key) ? new SigningKey(key) : key;
  const signature = signingKey.signDigest(hashMessage(message));
  return joinSignature(signature);
}

function verifyMessage(message: BytesLike, signature: SignatureLike): string {
  const digest = hashMessage(message);
  const publicKey = recoverPublicKey(arrayify(digest), signature);
  return sha256(publicKey);
}

export {
  signMessage,
  splitSignature,
  verifyMessage,
  computePublicKey,
  SigningKey,
  recoverPublicKey,
};
