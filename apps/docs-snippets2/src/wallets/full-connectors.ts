// #region full
/* eslint-disable @typescript-eslint/no-unused-vars */

import { FuelConnector, Fuel, MemoryStorage, LocalStorage } from 'fuels';
import type { TargetObject } from 'fuels';

class WalletConnector extends FuelConnector {
  name = 'My Wallet Connector';
}

const sdk = new Fuel();

/*
	Awaits for initialization to mitigate potential race conditions
	derived from the async nature of instantiating a connector.
*/
await sdk.init();

const defaultConnectors = (_opts: {
  devMode: boolean;
}): Array<FuelConnector> => [new WalletConnector()];

const sdkDevMode = await new Fuel({
  connectors: defaultConnectors({
    devMode: true,
  }),
}).init();

const sdkWithMemoryStorage = await new Fuel({
  storage: new MemoryStorage(),
}).init();

const window = {
  localStorage: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as unknown as Storage,
};

const sdkWithLocalStorage = await new Fuel({
  storage: new LocalStorage(window.localStorage),
}).init();

const emptyWindow = {} as unknown as TargetObject;

const targetObject: TargetObject = emptyWindow || document;

const sdkWithTargetObject = await new Fuel({
  targetObject,
}).init();

// #endregion full
