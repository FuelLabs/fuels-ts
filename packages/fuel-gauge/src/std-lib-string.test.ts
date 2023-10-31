import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId } from 'fuels';
import type { BN } from 'fuels';

import predicateStdString from '../fixtures/forc-projects/predicate-std-lib-string';
import predicateStdStringAbi from '../fixtures/forc-projects/predicate-std-lib-string/out/debug/predicate-std-lib-string-abi.json';

import { getProgramDir, getScript } from './utils';

const contractDir = getProgramDir('std-lib-string');

/**
 * @group node
 */
describe('std-lib-string Tests', () => {
  beforeAll(async (ctx) => {
    await TestNodeLauncher.prepareCache(ctx.tasks.length);

    return () => TestNodeLauncher.killCachedNodes();
  });

  it('should test std-lib-string return', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const { value } = await contractInstance.functions
      .return_dynamic_string()
      .txParams({ gasPrice })
      .call<string>();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [contractDir],
    });
    const {
      contracts: [contractInstance],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const INPUT = 'Hello World';

    const { value } = await contractInstance.functions
      .accepts_dynamic_string(INPUT)
      .txParams({ gasPrice })
      .call();

    expect(value).toBeUndefined();
  });

  it('should test String input [predicate-std-lib-string]', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [number, number, string];
    const predicate = new Predicate<MainArgs>(
      predicateStdString,
      wallet.provider,
      predicateStdStringAbi
    );

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
    });
    await setupTx.waitForResult();

    const initialPredicateBalance = await predicate.getBalance();
    const initialReceiverBalance = await receiver.getBalance();
    const tx = await predicate
      .setData(1, 2, 'Hello World')
      .transfer(receiver.address, amountToReceiver, BaseAssetId, { gasPrice });
    await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );

    // Check we spent the entire predicate hash input
    const finalPredicateBalance = await predicate.getBalance();
    expect(finalPredicateBalance.lte(initialPredicateBalance)).toBeTruthy();
  });

  it('should test String input [script-std-lib-string]', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    type MainArgs = [string];
    const scriptInstance = getScript<MainArgs, void>('script-std-lib-string', wallet);
    const INPUT = 'Hello World';

    const { value } = await scriptInstance.functions.main(INPUT).txParams({ gasPrice }).call<BN>();

    expect(value.toNumber()).toStrictEqual(0);
  });
});
