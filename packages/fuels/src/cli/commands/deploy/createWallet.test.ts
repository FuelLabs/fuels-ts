import { safeExec } from '@fuel-ts/errors/test-utils';
import { FUEL_NETWORK_URL } from '@fuel-ts/wallet/configs';

import { createWallet } from './createWallet';

describe('createWallet', () => {
  const privateKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

  test('create wallet using `privateKey` variable', async () => {
    const wallet = await createWallet(FUEL_NETWORK_URL, privateKey);
    expect(wallet.privateKey).toEqual(privateKey);
  });

  test('create wallet using `PRIVATE_KEY` env variable', async () => {
    process.env.PRIVATE_KEY = privateKey;
    const wallet = await createWallet(FUEL_NETWORK_URL);
    expect(wallet.privateKey).toEqual(process.env.PRIVATE_KEY);
    process.env.PRIVATE_KEY = undefined;
    delete process.env.PRIVATE_KEY;
  });

  test('warn about missing private key', async () => {
    const { error, result } = await safeExec(async () => {
      await createWallet(FUEL_NETWORK_URL);
    });
    expect(result).not.toBeTruthy();
    expect(error).toBeTruthy();
    expect(error?.message).toMatch(/you must provide.+privateKey.+PRIVATE_KEY/i);
  });
});
