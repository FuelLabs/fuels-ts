// #region fuel-options-storage-local
import { Fuel, LocalStorage } from 'fuels';

const sdkWithLocalStorage = await new Fuel({
  storage: new LocalStorage(window.localStorage),
}).init();
// #endregion fuel-options-storage-local
console.log('sdkWithLocalStorage', sdkWithLocalStorage);
