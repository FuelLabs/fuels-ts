import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';

import type { ProviderOptions } from '../..';
import { Provider } from '../..';

import type { ChainConfig } from './fuel-node-interfaces';
import { defaultChainConfig } from './defaultChainConfig';
import type { LaunchNodeOptions } from './launchNode';
import { launchNode } from './launchNode';

export interface SetupTestProviderOptions {
  providerOptions: Partial<ProviderOptions>;
  nodeOptions: Partial<
    Omit<LaunchNodeOptions, 'chainConfig'> & {
      chainConfig: PartialDeep<ChainConfig>;
    }
  >;
}
export async function setupTestProvider<Dispose extends boolean = true>(
  options?: Partial<SetupTestProviderOptions>,
  runCleanup?: Dispose
): Promise<
  Dispose extends true
    ? Provider & AsyncDisposable
    : { provider: Provider; cleanup: () => Promise<void> }
> {
  // @ts-expect-error this is a polyfill (see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
  Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose');

  const nodeOptions: Partial<LaunchNodeOptions> = {
    ...options?.nodeOptions,
    consensusKey: '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298',
    chainConfig: mergeDeepRight(defaultChainConfig, options?.nodeOptions?.chainConfig || {}),
  };

  const { cleanup, ip, port } = await launchNode(nodeOptions);
  const provider = await Provider.create(`http://${ip}:${port}/graphql`, options?.providerOptions);

  const dispose = runCleanup ?? true;
  // @ts-expect-error TODO: fix later
  return dispose
    ? Object.assign(provider, {
        [Symbol.asyncDispose]: cleanup,
      })
    : {
        provider,
        cleanup,
      };
}
