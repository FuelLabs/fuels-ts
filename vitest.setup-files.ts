import { beforeAll } from 'vitest';

// To be removed after the `fuel-core@0.41.0` release
// The following should resolved it: https://github.com/FuelLabs/fuel-vm/pull/875
beforeAll(() => {
  console.warn = (message) => {
    if (message.includes('using deprecated parameters for the initialization function')) {
      return;
    }

    console.warn(message);
  };
});
