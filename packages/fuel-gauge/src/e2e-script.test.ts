/* eslint-disable no-console */
import { Provider, TransactionType, WalletUnlocked } from 'fuels';

import { getScript } from './utils';

/**
 * @group node
 * @group e2e
 */
describe('Live Script Test', () => {
  const MINT_TX_ID = '0x03299946676ddc0044a52a675dd201d3173886c998a7301262141334b6d5a29e';
  const UPGRADE_TX_ID = '0xe2c03044fe708e9b112027881baf9f892e6b64a630a629998922c1cab918c094';
  const UPLOAD_TX_ID = '0x94bc2a189b8211796c8fe5b9c6b67624fe97d2007e104bf1b30739944f43bd73';

  let provider: Provider;
  let wallet: WalletUnlocked;
  let shouldSkip: boolean;

  beforeAll(async () => {
    if (!process.env.TEST_WALLET_PVT_KEY || !process.env.FUEL_TESTNET_NETWORK_URL) {
      console.log('Skipping live Fuel Node test');
      shouldSkip = true;
      return;
    }

    provider = await Provider.create(process.env.FUEL_TESTNET_NETWORK_URL);
    wallet = new WalletUnlocked(process.env.TEST_WALLET_PVT_KEY, provider);
  });

  it('can use script against live Fuel Node', async () => {
    if (shouldSkip) {
      return;
    }

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
        - add assets: https://faucet-testnet.fuel.network/
        - check balance: https://app.fuel.network/account/${address}/assets/
        - bech32 address: ${address}
      `);
    }

    expect(output).toBe(true);
  });

  it.skip.each([
    ['Mint', MINT_TX_ID, TransactionType.Mint],
    ['Upgrade', UPGRADE_TX_ID, TransactionType.Upgrade],
    ['Upload', UPLOAD_TX_ID, TransactionType.Upload],
  ])('can query and decode a %s transaction', async (_, txId, type) => {
    if (shouldSkip) {
      return;
    }
    const transaction = await provider.getTransaction(txId);

    expect(transaction?.type).toBe(type);
  });
});
