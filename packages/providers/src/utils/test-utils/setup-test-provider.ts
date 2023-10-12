import type { LaunchNodeOptions } from '@fuel-ts/utils/test-utils';
import { launchNode } from '@fuel-ts/utils/test-utils';

import type { ProviderOptions } from '../..';
import { Provider } from '../..';

export interface SetupTestProviderOptions {
  providerOptions: Partial<ProviderOptions>;
  nodeOptions: Partial<LaunchNodeOptions>;
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

  const { cleanup, ip, port } = await launchNode(options?.nodeOptions ?? {});
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
