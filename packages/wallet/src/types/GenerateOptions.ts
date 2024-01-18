import type { Provider } from '@fuel-ts/providers';
import type { BytesLike } from 'ethers';

export interface GenerateOptions {
  /** Additional entropy for the random bytes */
  entropy?: BytesLike;
  provider?: Provider;
}
