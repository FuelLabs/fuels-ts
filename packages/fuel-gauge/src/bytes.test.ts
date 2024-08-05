import { bn, Wallet, Address } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateBytesAbi__factory, ScriptBytesAbi__factory } from '../test/typegen';
import { BytesAbi__factory } from '../test/typegen/contracts';
import BytesAbiHex from '../test/typegen/contracts/BytesAbi.hex';

import { launchTestContract } from './utils';

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

    const { waitForResult } = await contractInstance.functions.return_bytes(10).call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  });

  it('should test bytes output [100 items]', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });

    const { waitForResult } = await contractInstance.functions.return_bytes(100).call();
    const { value } = await waitForResult();

    expect(value).toStrictEqual(new Uint8Array(Array.from({ length: 100 }, (e, i) => i)));
  });

  it('should test bytes input', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });

    const INPUT = [40, 41, 42];

    const { waitForResult } = await contractInstance.functions.accept_bytes(INPUT).call();
    const { value } = await waitForResult();

    expect(value).toBeUndefined();
  });

  it('should test bytes input [nested]', async () => {
    using contractInstance = await launchTestContract({
      deployer: BytesAbi__factory,
      bytecode: BytesAbiHex,
    });
    const bytes = [40, 41, 42];

    const { waitForResult } = await contractInstance.functions
      .accept_nested_bytes({
        inner: [bytes, bytes],
        inner_enum: { Second: bytes },
      })
      .call();

    const { value } = await waitForResult();

    expect(value).toBeUndefined();
  });

  it('should test bytes input [predicate-bytes]', async () => {
    using launched = await launchTestNode({
      contractsConfigs: [
        {
          deployer: BytesAbi__factory,
          bytecode: BytesAbiHex,
        },
      ],
    });

    const {
      wallets: [wallet],
    } = launched;

    const receiver = Wallet.fromAddress(Address.fromRandom(), wallet.provider);
    const amountToPredicate = 500_000;
    const amountToReceiver = 50;

    const bytes = [40, 41, 42];

    const predicate = PredicateBytesAbi__factory.createInstance(wallet.provider, [
      {
        inner: [bytes, bytes],
        inner_enum: { Second: bytes },
      },
    ]);

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
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    const bytes = [40, 41, 42];

    const scriptInstance = ScriptBytesAbi__factory.createInstance(wallet);

    const { waitForResult } = await scriptInstance.functions
      .main(1, {
        inner: [bytes, bytes],
        inner_enum: { Second: bytes },
      })
      .call();
    const { value } = await waitForResult();

    expect(value).toBe(true);
  });
});
