import { launchNode } from '@fuel-ts/utils/test-utils';

import type { ProviderOptions } from '../../provider';
import Provider from '../../provider';

export async function setupTestProvider<Dispose extends boolean = true>(
  providerOptions?: ProviderOptions,
  runCleanup?: Dispose
): Promise<
  Dispose extends true ? Provider & Disposable : { provider: Provider; cleanup: () => void }
> {
  // @ts-expect-error this is a polyfill (see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
  Symbol.dispose ??= Symbol('Symbol.dispose');
  // @ts-expect-error this is a polyfill (see https://devblogs.microsoft.com/typescript/announcing-typescript-5-2/#using-declarations-and-explicit-resource-management)
  Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose');

  const { cleanup, ip, port } = await launchNode({});
  let provider = await Provider.create(`http://${ip}:${port}/graphql`, providerOptions);

  const dispose = runCleanup ?? true;
  // @ts-expect-error TODO: fix later
  return dispose
    ? Object.assign(provider, {
        [Symbol.dispose]: () => {
          cleanup();
          // @ts-expect-error test
          provider = null;
        },
      })
    : {
        provider,
        cleanup,
      };
}
