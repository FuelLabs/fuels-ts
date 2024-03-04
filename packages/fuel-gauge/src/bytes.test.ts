import { generateTestWallet } from '@fuel-ts/account/test-utils';
import { bn, Predicate, Wallet, Address, BaseAssetId, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { BN, Contract } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

import { getScript, getSetupContract } from './utils';

const setupContract = getSetupContract('bytes');
let contractInstance: Contract;
beforeAll(async () => {
  contractInstance = await setupContract();
});

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

const setup = async (balance = 500_000) => {
  const provider = await Provider.create(FUEL_NETWORK_URL);
  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, BaseAssetId]]);

  return wallet;
};

/**
 * @group node
 */
describe('Bytes Tests', () => {
  let gasPrice: BN;
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    ({ minGasPrice: gasPrice } = provider.getGasConfig());
  });

  it('should test bytes output', async () => {
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it('should test bytes output [100 items]', async () => {
    const INPUT = 100;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array(Array.from({ length: 100 }, (e, i) => i)));
  });

  it('should test bytes input', async () => {
    const INPUT = [40, 41, 42];

    const { value } = await contractInstance.functions.accept_bytes(INPUT).call<number[]>();
    expect(value).toBeUndefined();
  });

  it('should test bytes input [nested]', async () => {
    const bytes = [40, 41, 42];

    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await contractInstance.functions.accept_nested_bytes(INPUT).call<number[]>();
    expect(value).toBeUndefined();
  });

  it('should test bytes input [predicate-bytes]', async () => {
    const wallet = await setup(1_000_000);
    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 500_000;
    const amountToReceiver = 50;
    type MainArgs = [Wrapper];

    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.PREDICATE_BYTES
    );

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const predicate = new Predicate<MainArgs>(binHexlified, wallet.provider, abiContents, [INPUT]);

    // setup predicate
    const setupTx = await wallet.transfer(predicate.address, amountToPredicate, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });
    await setupTx.waitForResult();

    const initialPredicateBalance = await predicate.getBalance();
    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(receiver.address, amountToReceiver, BaseAssetId, {
      gasPrice,
      gasLimit: 10_000,
    });
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

  it('should test bytes input [script-bytes]', async () => {
    const wallet = await setup();
    type MainArgs = [number, Wrapper];
    const scriptInstance = getScript<MainArgs, void>('script-bytes', wallet);

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await scriptInstance.functions.main(1, INPUT).call<BN>();
    expect(value.toNumber()).toStrictEqual(0);
  });
});
