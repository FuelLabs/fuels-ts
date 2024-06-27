import { bn, Predicate, Wallet, Address, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { Contract } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getScript, getSetupContract } from './utils';

const setupContract = getSetupContract('std-lib-string');
let contractInstance: Contract;

let baseAssetId: string;
beforeAll(async () => {
  contractInstance = await setupContract();
  baseAssetId = contractInstance.provider.getBaseAssetId();
});

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);

  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, baseAssetId]]);

  return wallet;
};

/**
 * @group node
 */
describe('std-lib-string Tests', () => {
  const { binHexlified: predicateStdString, abiContents: predicateStdStringAbi } =
    getFuelGaugeForcProject(FuelGaugeProjectsEnum.PREDICATE_STD_LIB_STRING);

  it('should test std-lib-string return', async () => {
    const { value } = await contractInstance.functions.return_dynamic_string().call<string>();
    expect(value).toBe('Hello World');
  });

  it('should test std-lib-string input', async () => {
    const INPUT = 'Hello World';

    const { value } = await contractInstance.functions.accepts_dynamic_string(INPUT).call();

    expect(value).toBeUndefined();
  });

  it('should test String input [predicate-std-lib-string]', async () => {
    const wallet = await setup();
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [number, number, string];
    const predicate = new Predicate<MainArgs>({
      bytecode: predicateStdString,
      abi: predicateStdStringAbi,
      provider: wallet.provider,
      inputData: [1, 2, 'Hello World'],
    });

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, baseAssetId, {
      gasLimit: 10_000,
    });
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();
    const tx = await predicate.transfer(receiver.address, amountToReceiver, baseAssetId, {
      gasLimit: 10_000,
    });
    const { isStatusSuccess } = await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );

    expect(isStatusSuccess);
  });

  it('should test String input [script-std-lib-string]', async () => {
    const wallet = await setup();
    type MainArgs = [string];
    const scriptInstance = getScript<MainArgs, void>('script-std-lib-string', wallet);
    const INPUT = 'Hello World';

    const { value } = await scriptInstance.functions.main(INPUT).call();

    expect(value).toBe(true);
  });
});
