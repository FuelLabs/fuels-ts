import { bn, Predicate, Wallet, Address } from 'fuels';
import type { BN } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ScriptRawSlice } from '../test/typegen';
import { RawSliceContractFactory } from '../test/typegen/contracts';
import { PredicateRawSlice } from '../test/typegen/predicates';

import { launchTestContract } from './utils';

type SomeEnum = {
  First?: boolean;
  Second?: number[];
};

type Wrapper = {
  inner: number[][];
  inner_enum: SomeEnum;
};

function setupRawSliceContract() {
  return launchTestContract({
    factory: RawSliceContractFactory,
  });
}
/**
 * @group node
 * @group browser
 */
describe('Raw Slice Tests', () => {
  it('should test raw slice output', async () => {
    using contractInstance = await setupRawSliceContract();

    const INPUT = 10;

    const { waitForResult } = await contractInstance.functions.return_raw_slice(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('should test raw slice input', async () => {
    using contractInstance = await setupRawSliceContract();

    const INPUT = [40, 41, 42];

    const { waitForResult } = await contractInstance.functions
      .accept_raw_slice(INPUT)
      .call<number[]>();

    const { value } = await waitForResult();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [nested]', async () => {
    using contractInstance = await setupRawSliceContract();

    const slice = [40, 41, 42];
    const INPUT = {
      inner: [slice, slice],
      inner_enum: { Second: slice },
    };

    const { waitForResult } = await contractInstance.functions
      .accept_nested_raw_slice(INPUT)
      .call<number[]>();

    const { value } = await waitForResult();

    expect(value).toBeUndefined();
  });

  it('should test raw slice input [predicate-raw-slice]', async () => {
    using launched = await launchTestNode();

    const {
      provider,
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.fromAddress(Address.fromRandom(), provider);
    const amountToPredicate = 300_000;
    const amountToReceiver = 50;
    type MainArgs = [Wrapper];

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const predicate = new Predicate<MainArgs>({
      abi: PredicateRawSlice.abi,
      bytecode: PredicateRawSlice.bytecode,
      provider: wallet.provider,
      data: [INPUT],
    });

    // setup predicate
    const setupTx = await wallet.transfer(
      predicate.address,
      amountToPredicate,
      provider.getBaseAssetId(),
      {
        gasLimit: 10_000,
      }
    );
    await setupTx.waitForResult();

    const initialReceiverBalance = await receiver.getBalance();

    const tx = await predicate.transfer(
      receiver.address,
      amountToReceiver,
      provider.getBaseAssetId(),
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
    expect(isStatusSuccess);
  });

  it('should test raw slice input [script-raw-slice]', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const scriptInstance = new ScriptRawSlice(wallet);

    const bytes = [40, 41, 42];
    const INPUT: Wrapper = {
      inner: [bytes, bytes],
      inner_enum: { Second: bytes },
    };

    const { waitForResult } = await scriptInstance.functions.main(3, INPUT).call<BN[]>();
    const { value } = await waitForResult();
    expect(value).toStrictEqual([0, 1, 2]);
  });
});
