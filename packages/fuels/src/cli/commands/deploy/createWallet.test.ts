import { ErrorCode } from '@fuel-ts/errors';

import { expectToThrowFuelError, launchTestNode, safeExec } from '../../../test-utils';

import { createWallet } from './createWallet';

/**
 * @group node
 */
describe('createWallet', () => {
  const privateKey = '0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298';

  test('create wallet using `privateKey` variable', async () => {
    using launched = await launchTestNode();

    const { provider } = launched;

    const wallet = await createWallet(provider.url, privateKey);
    expect(wallet.privateKey).toEqual(privateKey);
  });

  test('create wallet using `PRIVATE_KEY` env variable', async () => {
    process.env.PRIVATE_KEY = privateKey;

    using launched = await launchTestNode();
    const { provider } = launched;

    const wallet = await createWallet(provider.url);
    expect(wallet.privateKey).toEqual(process.env.PRIVATE_KEY);
    process.env.PRIVATE_KEY = undefined;
    delete process.env.PRIVATE_KEY;
  });

  test('warn about missing private key', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const { error, result } = await safeExec(async () => {
      await createWallet(provider.url);
    });
    expect(result).not.toBeTruthy();
    expect(error).toBeTruthy();
    expect(error?.message).toMatch(/you must provide.+privateKey.+PRIVATE_KEY/i);
  });

  test('throws error when failed to connect to node', async () => {
    const providerUrl = 'http://localhost:0';

    await expectToThrowFuelError(
      async () => {
        await createWallet(providerUrl, privateKey);
      },
      {
        code: ErrorCode.CONNECTION_REFUSED,
        message: `Couldn't connect to the node at "${providerUrl}". Check that you've got a node running at the config's providerUrl or set autoStartFuelCore to true.`,
      }
    );
  });
});
