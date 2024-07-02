import { bn, Predicate, Wallet, Address, Provider, FUEL_NETWORK_URL } from 'fuels';
import type { BN } from 'fuels';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';
import { BytesAbi__factory } from '../test/typegen/contracts';
import BytesAbiHex from '../test/typegen/contracts/BytesAbi.hex';

import { getScript, launchTestContract } from './utils';

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
  const baseAssetId = provider.getBaseAssetId();
  // Create wallet
  const wallet = await generateTestWallet(provider, [[balance, baseAssetId]]);

  return wallet;
};

/**
 * @group node
 * @group browser
 */
describe('Bytes Tests', () => {
  it('should test bytes output', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });
    const INPUT = 10;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it('should test bytes output [100 items]', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });

    const INPUT = 100;

    const { value } = await contractInstance.functions.return_bytes(INPUT).call<number[]>();

    expect(value).toStrictEqual(new Uint8Array(Array.from({ length: 100 }, (e, i) => i)));
  });

  it('should test bytes input', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });

    const INPUT = [40, 41, 42];

    const { value } = await contractInstance.functions.accept_bytes(INPUT).call<number[]>();
    expect(value).toBeUndefined();
  });

  it('should test bytes input [nested]', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });
    const bytes = [40, 41, 42];

    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { value } = await contractInstance.functions.accept_nested_bytes(INPUT).call<number[]>();
    expect(value).toBeUndefined();
  });

  it('should test bytes input [predicate-bytes]', async () => {
    using launched = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });

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

    const predicate = new Predicate<MainArgs>({
      bytecode: binHexlified,
      abi: abiContents,
      provider: wallet.provider,
      inputData: [INPUT],
    });

    // setup predicate
    const setupTx = await wallet.transfer(
      predicate.address,
      amountToPredicate,
      launched.provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(
      receiver.address,
      amountToReceiver,
      launched.provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );

    const { isStatusSuccess } = await tx.waitForResult();

    // Check the balance of the receiver
    const finalReceiverBalance = await receiver.getBalance();
    expect(bn(initialReceiverBalance).add(amountToReceiver).toHex()).toEqual(
      finalReceiverBalance.toHex()
    );

    expect(isStatusSuccess).toBeTruthy();
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
    expect(value).toBe(true);
  });
});
