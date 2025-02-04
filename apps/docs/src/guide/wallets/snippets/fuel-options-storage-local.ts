// #region fuel-options-storage-local
import { Fuel, LocalStorage } from 'fuels';

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
// #endregion fuel-options-storage-local
console.log('sdkWithLocalStorage', sdkWithLocalStorage);
