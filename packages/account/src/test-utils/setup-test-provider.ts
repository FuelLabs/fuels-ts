import type { ChainConfig } from '@fuel-ts/utils';
import { defaultChainConfig } from '@fuel-ts/utils';
import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';

import { Provider } from '../providers';
import type { ProviderOptions } from '../providers';

import type { LaunchNodeOptions, LaunchNodeResult } from './launchNode';
import { launchNode } from './launchNode';

export interface SetupTestProviderOptions {
  /** Options for configuring the provider. */
  providerOptions: Partial<ProviderOptions>;
  /** Options for configuring the test node. */
  nodeOptions: Partial<
    Omit<LaunchNodeOptions, 'chainConfig'> & {
      chainConfig: PartialDeep<ChainConfig>;
    }
  >;
}

export async function setupTestProvider<
  Dispose extends boolean = true,
  R = Dispose extends true
    ? Provider & Disposable
    : { provider: Provider } & Pick<Awaited<LaunchNodeResult>, 'cleanup'>,
>(options?: Partial<SetupTestProviderOptions>, dispose?: Dispose): Promise<R> {
  // @ts-expect-error this is a polyfill (see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
  Symbol.dispose ??= Symbol('Symbol.dispose');

  const nodeOptions: Partial<LaunchNodeOptions> = {
    ...options?.nodeOptions,
    chainConfig: mergeDeepRight(defaultChainConfig, options?.nodeOptions?.chainConfig || {}),
    port: '0',
  };

  const { cleanup, url } = await launchNode(nodeOptions);

  try {
    const provider = await Provider.create(url, options?.providerOptions);

    return (
      dispose ?? true
        ? Object.assign(provider, {
            [Symbol.dispose]: cleanup,
          })
        : {
            provider,
            cleanup,
          }
    ) as R;
  } catch (err) {
    cleanup();
    throw err;
  }
}
