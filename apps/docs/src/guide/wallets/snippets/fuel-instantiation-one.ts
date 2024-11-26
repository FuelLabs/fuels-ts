import { Fuel } from 'fuels';

// #region fuel-instantiation-1

const sdk = new Fuel();

/*
	Awaits for initialization to mitigate potential race conditions
	derived from the async nature of instantiating a connector.
*/
await sdk.init();
// #endregion fuel-instantiation-1
console.log('sdk', sdk);
