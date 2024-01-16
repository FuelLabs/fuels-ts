import type { Provider } from '@fuel-ts/providers';
import type { BytesLike } from '@fuel-ts/interfaces';

export interface GenerateOptions {
  /** Additional entropy for the random bytes */
  entropy?: BytesLike;
  provider: Provider;
}
