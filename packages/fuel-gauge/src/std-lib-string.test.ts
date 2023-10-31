import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { BN, Contract } from 'fuels';

import predicateStdString from '../fixtures/forc-projects/predicate-std-lib-string';
import predicateStdStringAbi from '../fixtures/forc-projects/predicate-std-lib-string/out/debug/predicate-std-lib-string-abi.json';

import { getScript, getSetupContract } from './utils';

const setupContract = getSetupContract('std-lib-string');
let contractInstance: Contract;
let gasPrice: BN;
beforeAll(async () => {
  contractInstance = await setupContract();
  ({ minGasPrice: gasPrice } = contractInstance.provider.getGasConfig());
});

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

describe('std-lib-string Tests', () => {
  it('should test std-lib-string return', async () => {
    const { value } = await contractInstance.functions
      .return_dynamic_string()
      .txParams({ gasPrice })
      .call<string>();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    const INPUT = 'Hello World';

    const { value } = await contractInstance.functions
      .accepts_dynamic_string(INPUT)
      .txParams({ gasPrice })
      .call();

    expect(value).toBeUndefined();
  });

  it('should test String input [predicate-std-lib-string]', async () => {
    const wallet = await setup();
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
    const wallet = await setup();
    type MainArgs = [string];
    const scriptInstance = getScript<MainArgs, void>('script-std-lib-string', wallet);
    const INPUT = 'Hello World';

    const { value } = await scriptInstance.functions.main(INPUT).txParams({ gasPrice }).call<BN>();

    expect(value.toNumber()).toStrictEqual(0);
  });
});
