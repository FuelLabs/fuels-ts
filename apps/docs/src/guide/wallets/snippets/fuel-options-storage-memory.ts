// #region fuel-options-storage-memory
import { Fuel, MemoryStorage } from 'fuels';

const sdkWithMemoryStorage = await new Fuel({
  storage: new MemoryStorage(),
}).init();
// #endregion fuel-options-storage-memory
console.log('sdkWithMemoryStorage', sdkWithMemoryStorage);
