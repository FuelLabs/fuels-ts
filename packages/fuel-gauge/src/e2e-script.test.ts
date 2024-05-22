/* eslint-disable no-console */
import { Provider, WalletUnlocked } from 'fuels';

import { getScript } from './utils';

/**
 * @group node
 * @group e2e
 */
describe('Live Script Test', () => {
  it('can use script against live Fuel Node', async () => {
    if (!process.env.TEST_WALLET_PVT_KEY || !process.env.FUEL_TESTNET_NETWORK_URL) {
      console.log('Skipping live Fuel Node test');
      return;
    }

    const provider = await Provider.create(process.env.FUEL_TESTNET_NETWORK_URL);
    const wallet = new WalletUnlocked(process.env.TEST_WALLET_PVT_KEY, provider);
    const scriptInstance = getScript<[boolean], boolean>('script-main-arg-bool', wallet);

    let output: boolean = false;
    try {
      const callScope = scriptInstance.functions.main(true);

      const { value } = await callScope.call();

      output = value;
    } catch (e) {
      const address = wallet.address.toAddress();

      console.error((e as Error).message);
      console.warn(`
        not enough coins to fit the target?
        - add assets: https://faucet-devnet.fuel.network/
        - check balance: https://app.fuel.network/account/${address}/assets/
        - bech32 address: ${address}
      `);
    }

    expect(output).toBe(true);
  });
});
