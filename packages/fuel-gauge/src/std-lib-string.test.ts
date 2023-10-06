import { generateTestWallet, setupTestProvider } from '@fuel-ts/wallet/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId, FUEL_NETWORK_URL } from 'fuels';
import type { BN, Contract, Provider } from 'fuels';

import predicateStdString from '../fixtures/forc-projects/predicate-std-lib-string';
import predicateStdStringAbi from '../fixtures/forc-projects/predicate-std-lib-string/out/debug/predicate-std-lib-string-abi.json';

import { getScript, getSetupContract } from './utils';

const setupContract = getSetupContract('std-lib-string');

const setup = async (provider: Provider, balance = 5_000) => {
  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

describe('std-lib-string Tests', () => {
  it('should test std-lib-string return', async () => {
    using provider = await setupTestProvider();
    const contractInstance = await setupContract(provider);

    const { value } = await contractInstance.functions.return_dynamic_string().call<string>();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    const INPUT = 'Hello World';
    using provider = await setupTestProvider();
    const contractInstance = await setupContract(provider);

    const { value } = await contractInstance.functions.accepts_dynamic_string(INPUT).call();

    expect(value).toBeUndefined();
  });

  it('should test String input [predicate-std-lib-string]', async () => {
    using provider = await setupTestProvider();

    const wallet = await setup(provider);
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 100;
    const amountToReceiver = 50;
    type MainArgs = [number, number, string];
    const predicate = new Predicate<MainArgs>(
      predicateStdString,
      wallet.provider,
      predicateStdStringAbi
    );

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId);
    await setupTx.waitForResult();

    const initialPredicateBalance = await predicate.getBalance();
    const initialReceiverBalance = await receiver.getBalance();
    const tx = await predicate
      .setData(1, 2, 'Hello World')
      .transfer(receiver.address, amountToReceiver);
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
    using provider = await setupTestProvider();

    const wallet = await setup(provider);
    type MainArgs = [string];
    const scriptInstance = getScript<MainArgs, void>('script-std-lib-string', wallet);
    const INPUT = 'Hello World';

    const { value } = await scriptInstance.functions.main(INPUT).call<BN>();

    expect(value.toNumber()).toStrictEqual(0);
  });
});
