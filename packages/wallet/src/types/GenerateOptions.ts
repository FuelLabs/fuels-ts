import type { BytesLike } from '@ethersproject/bytes';
import type { Provider } from '@fuel-ts/providers';

export interface GenerateOptions {
  /** Additional entropy for the random bytes */
  entropy?: BytesLike;
  provider: Provider;
}
