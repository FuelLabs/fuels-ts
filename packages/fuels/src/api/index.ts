import { Provider, type ProviderOptions } from '@fuel-ts/account';
import type { FuelError } from '@fuel-ts/errors';

import { Fuels } from './fuels';

export * from './fuels';

// QUESTION: should we support callback usage?
export type FuelsCallback = (params: Fuels, error?: FuelError) => unknown;

// 1. (networkUrl) => Promise<Fuels>
export function fuels(networkUrl: string): Promise<Fuels>;

// 2. (networkUrl, options) => Promise<Fuels>
export async function fuels(networkUrl: string, options: ProviderOptions): Promise<Fuels>;

// 3. (networkUrl, fn) => void
export function fuels(networkUrl: string, fn: FuelsCallback): void;

// 4. (networkUrl, options, fn) => void
export function fuels(
  networkUrl: string,
  optOrFn: ProviderOptions | FuelsCallback,
  fn: FuelsCallback
): void;

// Implementation
export async function fuels(
  networkUrl: string,
  optionsOrFn?: ProviderOptions | FuelsCallback,
  fn?: FuelsCallback
): Promise<Fuels | void> {
  const isOptionFn = typeof optionsOrFn === 'function';

  const options = !isOptionFn ? optionsOrFn : undefined;
  const fnc = fn ?? (isOptionFn ? <FuelsCallback>optionsOrFn : undefined);

  const provider = await Provider.create(networkUrl, options);
  const client = new Fuels(provider);

  if (fnc) {
    fnc(client);
  }

  return client;
}
