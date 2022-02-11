import type { BytesLike } from '@ethersproject/bytes';

export interface GenerateOptions {
  /** Additional entropy for the random bytes */
  entropy?: BytesLike;
}
